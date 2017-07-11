;;; slack-util.el ---utility functions               -*- lexical-binding: t; -*-

;; Copyright (C) 2015  yuya.minami

;; Author: yuya.minami <yuya.minami@yuyaminami-no-MacBook-Pro.local>
;; Keywords:

;; This program is free software; you can redistribute it and/or modify
;; it under the terms of the GNU General Public License as published by
;; the Free Software Foundation, either version 3 of the License, or
;; (at your option) any later version.

;; This program is distributed in the hope that it will be useful,
;; but WITHOUT ANY WARRANTY; without even the implied warranty of
;; MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
;; GNU General Public License for more details.

;; You should have received a copy of the GNU General Public License
;; along with this program.  If not, see <http://www.gnu.org/licenses/>.

;;; Commentary:

;;

;;; Code:

(require 'eieio)
(require 'timer)
(require 'diary-lib)

(defcustom slack-profile-image-file-directory temporary-file-directory
  "Default directory for slack profile images."
  :group 'slack)

(defcustom slack-image-file-directory temporary-file-directory
  "Default directory for slack images."
  :group 'slack)

(defcustom slack-image-max-height 300
  "Max Height of image.  nil is unlimited.  integer."
  :group 'slack)

(defun slack-seq-to-list (seq)
  (if (listp seq) seq (append seq nil)))

(defun slack-decode (seq)
  (cl-loop for e in (slack-seq-to-list seq)
           collect (if (stringp e)
                       (decode-coding-string e 'utf-8)
                     (if (listp e)
                         (slack-decode e)
                       e))))

(defun slack-class-have-slot-p (class slot)
  (and (symbolp slot)
       (let* ((stripped (substring (symbol-name slot) 1))
              (replaced (replace-regexp-in-string "_" "-"
                                                  stripped))
              (symbolized (intern replaced)))
         (slot-exists-p class symbolized))))

(defun slack-collect-slots (class seq)
  (let ((plist (slack-seq-to-list seq)))
    (cl-loop for p in plist
             if (and (slack-class-have-slot-p class p)
                     (plist-member plist p))
             nconc (let ((value (plist-get plist p)))
                     (list p (if (stringp value)
                                 (decode-coding-string value 'utf-8)
                               (if (eq :json-false value)
                                   nil
                                 value)))))))

(cl-defun slack-log (msg team &key (logger #'message))
  (let ((log (format "[%s] %s - %s"
                     (format-time-string "%Y-%m-%d %H:%M:%S")
                     msg
                     (oref team name)))
        (buf (get-buffer-create (slack-log-buffer-name team))))
    (funcall logger log)
    (with-current-buffer buf
      (setq buffer-read-only nil)
      (save-excursion
        (goto-char (point-max))
        (insert log)
        (insert "\n"))
      (setq buffer-read-only t))))

(defun company-slack-backend (command &optional arg &rest ignored)
  "Completion backend for slack chats.  It currently understands
@USER; adding #CHANNEL should be a simple matter of programming."
  (interactive (list 'interactive))
  (cl-labels
      ((start-from-line-beginning (str)
                                  (let ((prompt-length (length lui-prompt-string)))
                                    (>= 0 (- (current-column) prompt-length (length str)))))
       (prefix-type (str) (cond
                           ((string-prefix-p "@" str) 'user)
                           ((string-prefix-p "#" str) 'channel)
                           ((and (string-prefix-p "/" str)
                                 (start-from-line-beginning str))
                            'slash)))
       (content (str) (substring str 1 nil)))
    (cl-case command
      (interactive (company-begin-backend 'company-slack-backend))
      (prefix (when (cl-find major-mode '(slack-mode
                                          slack-edit-message-mode
                                          slack-thread-mode))
                (company-grab-line "\\(\\W\\|^\\)\\(@\\w*\\|#\\w*\\|/\\w*\\)"
                                   2)))
      (candidates (let ((content (content arg)))
                    (cl-case (prefix-type arg)
                      (user
                       (cl-loop for user in (oref slack-current-team users)
                                if (string-prefix-p content
                                                    (plist-get user :name))
                                collect (concat "@" (plist-get user :name))))
                      (channel
                       (cl-loop for team in (oref slack-current-team channels)
                                if (string-prefix-p content
                                                    (oref team name))
                                collect (concat "#" (oref team name))))
                      (slash
                       (cl-loop for com in slack-slash-commands-available
                                if (string-prefix-p content com)
                                collect (concat "/" com))
                       ))))
      (doc-buffer
       (cl-case (prefix-type arg)
         (slash
          (company-doc-buffer
           (documentation
            (slack-slash-commands-find (substring arg 1))
            t)))))
      )))

(defun slack-get-ts ()
  (get-text-property 0 'ts (thing-at-point 'line)))

(defun slack-linkfy (text link)
  (format "<%s|%s>" link text))

(defun slack-string-blankp (str)
  (if str
      (> 1 (length str))
    t))

(defun slack-log-buffer-name (team)
  (format "*Slack Log - %s*" (slack-team-name team)))

(defun slack-log-open-buffer ()
  (interactive)
  (let ((team (slack-team-select)))
    (funcall slack-buffer-function (get-buffer-create (slack-log-buffer-name team)))))

(defun slack-event-log-buffer-name (team)
  (format "*Slack Event Log - %s*" (slack-team-name team)))

(defun slack-log-websocket-payload (payload team)
  (let* ((bufname (slack-event-log-buffer-name team))
         (buf (get-buffer-create bufname)))
    (when buf
      (with-current-buffer buf
        (setq buffer-read-only nil)
        (save-excursion
          (goto-char (point-max))
          (insert (format "[%s] %s\n"
                          (format-time-string "%Y-%m-%d %H:%M:%S")
                          payload)))
        (setq buffer-read-only t)))))

(defun slack-log-open-event-buffer ()
  (interactive)
  (let* ((team (slack-team-select))
         (bufname (slack-event-log-buffer-name team))
         (buf (get-buffer bufname)))
    (if buf
        (funcall slack-buffer-function buf)
      (error "No Event Log Buffer"))))

(defun slack-profile-image-path (image-url team)
  (expand-file-name
   (concat (md5 (concat (slack-team-name team) "-" image-url))
           "."
           (file-name-extension image-url))
   slack-profile-image-file-directory))

(cl-defun slack-image--create (path &key (width nil) (height nil))
  (if (image-type-available-p 'imagemagick)
      (slack-image-shrink (apply #'create-image (append (list path 'imagemagick nil)
                                                        (if height (list :height height))
                                                        (if width (list :width width)))))
    (create-image path)))

(defun slack-image-path (image-url)
  (expand-file-name
   (concat (md5 image-url)
           "."
           (file-name-extension image-url))
   slack-image-file-directory))

(defun slack-image-slice (image)
  (when image
    (let* ((line-height 50.0)
           (height (or (plist-get (cdr image) :height)
                       (cdr (image-size image t))))
           (line-count (/ height line-height))
           (line (/ 1.0 line-count)))
      (if (< line-height height)
          (cl-loop for i from 0 to (- line-count 1)
                   collect (list (list 'slice 0 (* line i) 1.0 line)
                                 image))
        (list image)))))

(defun slack-image-shrink (image)
  (unless (image-type-available-p 'imagemagick)
    (error "Need Imagemagick"))
  (if slack-image-max-height
      (let* ((data (plist-get (cdr image) :data))
             (file (plist-get (cdr image) :file))
             (size (image-size image t))
             (height (cdr size))
             (width (car size))
             (h (min height slack-image-max-height))
             (w (if (< slack-image-max-height height)
                    (ceiling
                     (* (/ (float slack-image-max-height) height)
                        width))
                  width)))
        (create-image (or file data) 'imagemagick data :height h :width w))
    image))

(defun slack-mapconcat-images (images)
  (when images
    (cl-labels ((sort-images (images)
                             (let ((compare (if (< emacs-major-version 26)
                                                #'>
                                              #'<)))
                               (cl-sort images compare :key #'(lambda (image) (caddr (car image))))))
                (propertize-image (image)
                                  (propertize "image"
                                              'display image
                                              'face 'slack-profile-image-face)))
      (mapconcat #'propertize-image (sort-images images) "\n"))))

(cl-defun slack-url-copy-file (url newname &key (success nil) (error nil) (sync nil) (token nil))
  (cl-labels
      ((on-success (&key data &allow-other-keys)
                   (when (functionp success) (funcall success)))
       (on-error (&key error-thrown symbol-status response data)
                 (message "Error Fetching Image: %s %s %s, url: %s"
                          (request-response-status-code response)
                          error-thrown symbol-status url)
                 (case (request-response-status-code response)
                   (403 nil)
                   (404 nil)
                   (t (progn
                        (url-copy-file url newname)
                        (when (functionp error) (funcall error))))))
       (parser () (mm-write-region (point-min) (point-max)
                                   newname nil nil nil 'binary t)))
    (request
     url
     :success #'on-success
     :error #'on-error
     :parser #'parser
     :sync sync
     :headers (when (and token (string-prefix-p "https" url))
                (list (cons "Authorization" (format "Bearer %s" token)))))))

(defun slack-render-image (image team)
  (let ((buf (get-buffer-create
              (format "*Slack - %s Image*" (slack-team-name team)))))
    (with-current-buffer buf
      (setq buffer-read-only nil)
      (erase-buffer)
      (if image
          (insert (slack-mapconcat-images (slack-image-slice image)))
        (insert "Loading Image..."))
      (setq buffer-read-only t)
      (goto-char (point-min)))

    buf))

(defun slack-parse-time-string (time)
  "TIME should be one of:
- a string giving today’s time like \"11:23pm\"
  (the acceptable formats are HHMM, H:MM, HH:MM, HHam, HHAM,
  HHpm, HHPM, HH:MMam, HH:MMAM, HH:MMpm, or HH:MMPM;
  a period ‘.’ can be used instead of a colon ‘:’ to separate
  the hour and minute parts);
- a string giving specific date and time like \"1991/03/23 03:00\";
- a string giving a relative time like \"90\" or \"2 hours 35 minutes\"
  (the acceptable forms are a number of seconds without units
  or some combination of values using units in ‘timer-duration-words’);
- a number of seconds from now;"
  (if (numberp time)
      (setq time (timer-relative-time nil time)))
  (if (stringp time)
      (let ((secs (timer-duration time)))
        (if secs
            (setq time (timer-relative-time nil secs)))))
  (if (stringp time)
      (progn
        (let* ((date-and-time (split-string time " "))
               (date (and (eq (length date-and-time) 2) (split-string (car date-and-time) "/")))
               (time-str (or (and (eq (length date-and-time) 2) (cadr date-and-time))
                             (car date-and-time)))
               (hhmm (diary-entry-time time-str))
               (now (or (and date (decode-time
                                   (encode-time 0 0 0
                                                (string-to-number (nth 2 date))
                                                (string-to-number (nth 1 date))
                                                (string-to-number (nth 0 date))
                                                )))
                        (decode-time))))
          (if (>= hhmm 0)
              (setq time
                    (encode-time 0 (% hhmm 100) (/ hhmm 100) (nth 3 now)
                                 (nth 4 now) (nth 5 now) (nth 8 now)))))))
  time)

(provide 'slack-util)
;;; slack-util.el ends here
