;;; slack.el --- slack client for emacs              -*- lexical-binding: t; -*-

;; Copyright (C) 2015  yuya.minami

;; Author: yuya.minami <yuya.minami@yuyaminami-no-MacBook-Pro.local>
;; Keywords: tools
;; Version: 0.0.2
;; Package-Requires: ((websocket "1.5") (request "0.2.0") (oauth2 "0.10") (circe "2.3") (alert "1.2") (emojify "0.4") (emacs "24.4"))
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
(require 'cl-lib)
(require 'subr-x)
(require 'oauth2)

(require 'slack-team)
(require 'slack-channel)
(require 'slack-im)
(require 'slack-file)
(require 'slack-message-notification)
(require 'slack-message-sender)
(require 'slack-message-editor)
(require 'slack-message-reaction)
(require 'slack-user-message)
(require 'slack-bot-message)
(require 'slack-search)
(require 'slack-reminder)
(require 'slack-thread)
(require 'slack-message-update)
(require 'slack-message-changed)
(require 'slack-message-delete)
(require 'slack-room-history)
(require 'slack-file-share-message)
(require 'slack-attachment)
(require 'slack-emoji)

(require 'slack-websocket)
(require 'slack-request)

(defgroup slack nil
  "Emacs Slack Client"
  :prefix "slack-"
  :group 'tools)

(defcustom slack-redirect-url "http://localhost:8080"
  "Redirect url registered for Slack.")
(defcustom slack-buffer-function #'switch-to-buffer-other-window
  "Function to print buffer.")

(defvar slack-use-register-team-string
  "use `slack-register-team' instead.")

(defcustom slack-client-id nil
  "Client ID provided by Slack.")
(make-obsolete-variable
 'slack-client-id slack-use-register-team-string
 "0.0.2")
(defcustom slack-client-secret nil
  "Client Secret Provided by Slack.")
(make-obsolete-variable
 'slack-client-secret slack-use-register-team-string
 "0.0.2")
(defcustom slack-token nil
  "Slack token provided by Slack.
set this to save request to Slack if already have.")
(make-obsolete-variable
 'slack-token slack-use-register-team-string
 "0.0.2")
(defcustom slack-room-subscription '()
  "Group or Channel list to subscribe notification."
  :group 'slack)
(make-obsolete-variable
 'slack-room-subscription slack-use-register-team-string
 "0.0.2")
(defcustom slack-typing-visibility 'frame
  "When to show typing indicator.
frame means typing slack buffer is in the current frame, show typing indicator.
buffer means typing slack buffer is the current buffer, show typing indicator.
never means never show typing indicator."
  :type '(choice (const frame)
                 (const buffer)
                 (const never)))

(defcustom slack-display-team-name t
  "If nil, only display channel, im, group name."
  :group 'slack)

(defcustom slack-completing-read-function #'completing-read
  "Require same argument with `completing-read'."
  :group 'slack)

(defconst slack-oauth2-authorize "https://slack.com/oauth/authorize")
(defconst slack-oauth2-access "https://slack.com/api/oauth.access")
(defconst slack-authorize-url "https://slack.com/api/rtm.start")
(defconst slack-rtm-connect-url "https://slack.com/api/rtm.connect")

(defun slack-authorize (team &optional error-callback)
  (let ((authorize-request (oref team authorize-request)))
    (if (and authorize-request (not (request-response-done-p authorize-request)))
        (slack-log "Authorize Already Requested" team)
      (cl-labels
          ((on-error (&key error-thrown symbol-status response data)
                     (oset team authorize-request nil)
                     (if (functionp error-callback)
                         (funcall error-callback
                                  :error-thrown error-thrown
                                  :symbol-status symbol-status
                                  :response response
                                  :data data)
                       (slack-log (format "Slack Authorize Failed: %s" error-thrown)
                                  team)))
           (on-success (&key data &allow-other-keys)
                       (slack-on-authorize data team)))
        (let ((request (slack-request
                        (slack-request-create
                         slack-rtm-connect-url
                         team
                         :params (list (cons "mpim_aware" "1"))
                         :success #'on-success
                         :error #'on-error))))
          (oset team authorize-request request))))))

(defun slack-update-team (data team)
  (cl-labels
      ((create-rooms
        (datum team class)
        (mapcar #'(lambda (data)
                    (slack-room-create data team class))
                (append datum nil)))
       (create-open-rooms
        (datum team class)
        (mapcar #'(lambda (data)
                    (slack-room-create data team class))
                (append
                 (cl-remove-if #'(lambda (data) (eq (plist-get data :is_open) json-false)) datum)
                 nil))))
    (let ((self (plist-get data :self))
          (team-data (plist-get data :team)))
      (oset team id (plist-get team-data :id))
      (oset team name (plist-get team-data :name))
      (oset team self self)
      (oset team self-id (plist-get self :id))
      (oset team self-name (plist-get self :name))
      (oset team ws-url (plist-get data :url))
      team)))

(cl-defun slack-on-authorize (data team)
  (oset team authorize-request nil)
  (cl-labels
      ((update-room-info
        (team rooms)
        (mapc #'(lambda (room)
                  (unless (slack-room-hiddenp room)
                    (slack-room-info-request room team)))
              rooms))
       (delete-existing-buffer
        (rooms)
        (mapc #'(lambda (room)
                  (let ((bufname (slack-room-buffer-name room)))
                    (when (get-buffer bufname)
                      (kill-buffer bufname))))
              rooms)))
    (slack-request-handle-error
     (data "slack-authorize")
     (slack-log (format "Slack Authorization Finished" (oref team name)) team)
     (let ((team (slack-update-team data team)))
       (slack-channel-list-update
        team #'(lambda (team)
                 (let ((channels (oref team channels)))
                   (update-room-info team channels)
                   (delete-existing-buffer channels))))
       (slack-group-list-update
        team #'(lambda (team)
                 (let ((groups (oref team groups)))
                   (update-room-info team groups)
                   (delete-existing-buffer groups))))
       (slack-im-list-update
        team #'(lambda (team)
                 (slack-request-dnd-team-info
                  team
                  #'(lambda (team)
                      (let ((ims (oref team ims)))
                        (update-room-info team ims)
                        (delete-existing-buffer ims))))))
       (slack-bot-list-update team)
       (slack-request-emoji team)
       (slack-update-modeline)
       (slack-ws-open team)))))

(defun slack-on-authorize-e
    (&key error-thrown &allow-other-keys &rest_)
  (error "slack-authorize: %s" error-thrown))

(defun slack-oauth2-auth (team)
  (with-slots (client-id client-secret) team
    (oauth2-auth
     slack-oauth2-authorize
     slack-oauth2-access
     client-id
     client-secret
     "client"
     nil
     slack-redirect-url)))

(defun slack-request-token (team)
  (with-slots (token) team
    (setq token
          (oauth2-token-access-token
           (slack-oauth2-auth team)))))

;;;###autoload
(defun slack-start (&optional team)
  (interactive)
  (cl-labels ((start
               (team)
               (slack-ws-close team)
               (when (slack-team-need-token-p team)
                 (slack-request-token team))
               (slack-authorize team)))
    (if team
        (start team)
      (if slack-teams
          (cl-loop for team in slack-teams
                   do (start team))
        (slack-start (call-interactively #'slack-register-team))))
    (slack-enable-modeline)))

(defun slack-redisplay-message ()
  (interactive)
  (let* ((ts (slack-get-ts))
         (team (slack-team-find slack-current-team-id))
         (room (slack-room-find slack-current-room-id team))
         (message (slack-room-find-message room ts)))
    (slack-message-redisplay message room)))


(provide 'slack)
;;; slack.el ends here
