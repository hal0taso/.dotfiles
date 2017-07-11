;;; slack-attachment.el ---                          -*- lexical-binding: t; -*-

;; Copyright (C) 2017  南優也

;; Author: 南優也 <yuyaminami@minamiyuuya-no-MacBook.local>
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

(defclass slack-attachment ()
  ((fallback :initarg :fallback :initform nil)
   (title :initarg :title :initform nil)
   (title-link :initarg :title_link :initform nil)
   (pretext :initarg :pretext :initform nil)
   (text :initarg :text :initform nil)
   (author-name :initarg :author_name :initform nil)
   (author-link :initarg :author_link)
   (author-icon :initarg :author_icon)
   (fields :initarg :fields :initform '())
   (image-url :initarg :image_url :initform nil)
   (image-width :initarg :image_width :initform nil)
   (image-height :initarg :image_height :initform nil)
   (thumb-url :initarg :thumb_url)
   (is-share :initarg :is_share :initform nil)
   (footer :initarg :footer :initform nil)
   (color :initarg :color :initform nil)
   (ts :initarg :ts :initform nil)
   (author-subname :initarg :author_subname :initform nil)))

(defclass slack-shared-message (slack-attachment)
  ((channel-id :initarg :channel_id :initform nil)
   (channel-name :initarg :channel_name :initform nil)
   (from-url :initarg :from_url :initform nil)))

(defmethod slack-message-to-string ((attachment slack-attachment) image-renderer)
  (with-slots
      (fallback text ts color from-url footer fields pretext) attachment
    (let* ((pad-raw (propertize "|" 'face 'slack-attachment-pad))
           (pad (or (and color (propertize pad-raw 'face (list :foreground (concat "#" color))))
                    pad-raw))
           (header-raw (slack-attachment-header attachment))
           (header (and (not (slack-string-blankp header-raw))
                        (format "%s\t%s" pad
                                (propertize header-raw
                                            'face 'slack-attachment-header))))
           (pretext (and pretext (format "%s\t%s" pad pretext)))
           (body (and text (format "%s\t%s" pad (mapconcat #'identity
                                                           (split-string text "\n")
                                                           (format "\n\t%s\t" pad)))))
           (fields (if fields (mapconcat #'(lambda (field)
                                             (slack-attachment-field-to-string field
                                                                               (format "\t%s" pad)))
                                         fields
                                         (format "\n\t%s\n" pad))))
           (footer (if (and footer ts)
                       (format "%s\t%s"
                               pad
                               (propertize
                                (format "%s|%s" footer
                                        (slack-message-time-to-string ts))
                                'face 'slack-attachment-footer))))
           (image (when (functionp image-renderer)
                    (funcall image-renderer attachment))))
      (if (and (slack-string-blankp header)
               (slack-string-blankp pretext)
               (slack-string-blankp body)
               (slack-string-blankp fields)
               (slack-string-blankp footer))
          fallback
        (format "%s%s%s%s%s%s"
                (or (and header (format "\t%s\n" header)) "")
                (or (and pretext (format "\t%s\n" pretext)) "")
                (or (and body (format "\t%s" body)) "")
                (or (and fields fields) "")
                (or (and footer (format "\n\t%s" footer)) "")
                (or (and image (format "\n%s" image)) ""))
        ))))

(defmethod slack-message-has-imagep ((attachment slack-attachment))
  (oref attachment image-url))

(cl-defmethod slack-image-create ((attachment slack-attachment) &key success error)
  (with-slots (image-url image-height image-width) attachment
    (when image-url
      (let ((path (slack-image-path image-url)))
        (when path
          (cl-labels
              ((create-image () (slack-image--create path :height image-height :width image-width))
               (on-success () (funcall success (create-image)))
               (on-error () (funcall error (create-image))))
            (if (file-exists-p path) (create-image)
              (progn
                (slack-url-copy-file image-url path
                                     :success #'on-success
                                     :error #'on-error)
                nil))))))))

(defmethod slack-attachment-header ((attachment slack-attachment))
  (with-slots (title title-link author-name author-subname) attachment
    (concat (or (and title title-link (slack-linkfy title title-link))
                title
                "")
            (or author-name author-subname ""))))

(defmethod slack-attachment-field-to-string ((field slack-attachment-field) &optional pad)
  (unless pad (setq pad ""))
  (let ((title (propertize (or (oref field title) "") 'face 'slack-attachment-field-title))
        (value (mapconcat #'(lambda (e) (format "\t%s" e))
                          (split-string (or (oref field value) "") "\n")
                          (format "\n%s\t" pad))))
    (format "%s\t%s\n%s\t%s" pad title pad value)))

(defmethod slack-attachment-to-alert ((a slack-attachment))
  (oref a fallback))

(defmethod slack-open-image ((attachment slack-attachment) team)
  (cl-labels
      ((render (image)
               (funcall slack-buffer-function
                        (slack-render-image image team))))
    (render (slack-image-create attachment
                                :success #'render
                                :error #'render))))

(defmethod slack-message-view-image-to-string ((attachment slack-attachment) team)
  (and (slack-message-has-imagep attachment)
       (cl-labels
           ((open-image () (interactive) (slack-open-image attachment team)))
         (propertize "[View Image]"
                     'face '(:underline t)
                     'keymap (let ((keymap (make-sparse-keymap)))
                               (define-key keymap (kbd "RET") #'open-image)
                               keymap)))))

(provide 'slack-attachment)
;;; slack-attachment.el ends here
