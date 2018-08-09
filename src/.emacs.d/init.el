;;;
;;; init.el -- initialize and global settings is here.

;; if you use OSX

;; Added by Package.el.  This must come before configurations of
;; installed packages.  Don't delete this line.  If you don't want it,
;; just comment it out by adding a semicolon to the start of the line.
;; You may delete these explanatory comments.
(package-initialize)

(when (eq system-type 'darwin)
  (require 'cask)
  (set-frame-font "Monospace 14")
  (define-key global-map (kbd "C-c RET") 'set-mark-command)
  (set-frame-parameter nil 'fullscreen 'maximized)
  )

;; ============================================
;; if you use linux
(when (eq system-type 'gnu/linux)
  (require 'cask"~/.cask/cask.el")
  (set-frame-font "Monospace 9")
  )

;;;load a Cask's configuration file
;; Added by Package.el.  This must come before configurations of
;; installed packages.  Don't delete this line.  If you don't want it,
;; just comment it out by adding a semicolon to the start of the line.
;; You may delete these explanatory comments.


;;; Code:
(cask-initialize)


;;; init-loader.el
(require 'init-loader)
(init-loader-load "~/.emacs.d/inits")

(when (eq system-type 'gnu/linux)
  ;; eneble to use mozc for ime
  (require 'mozc)
  (set-language-environment "Japanese")
  (setq default-input-method "japanese-mozc")
  (set-buffer-file-coding-system 'utf-8)
  )

(scroll-bar-mode -1)
(tool-bar-mode -1)

(setq inhibit-startup-screen t)
(require 'whitespace)

;;; color theme

(load-theme 'darktooth t t)
(enable-theme 'darktooth)

;; 透明度を変更する
(defun set-alpha (alpha-num)
  "set frame parameter 'alpha"
  (interactive "nAlpha: ")
  (set-frame-parameter nil 'alpha (cons alpha-num '(90))))


;; default window alpha
(set-frame-parameter nil 'alpha 95)

;; change font size
(put 'upcase-region 'disabled nil)

;; enable type nn to japanse
;; (setq quail-japanese-use-double-n t)

;;; 括弧の補完
(electric-pair-mode 1)

;;; 対応する括弧のハイライト
(show-paren-mode t)

;;; init.el ends here
(custom-set-variables
 ;; custom-set-variables was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(global-linum-mode t)
 '(helm-gtags-auto-update t)
 '(helm-gtags-ignore-case t)
 '(helm-gtags-path-style (quote relative))
 '(helm-gtags-suggested-key-mapping t)
 '(package-selected-packages
   (quote
    (helm-projectile helm-swoop company zygospore yatex yasnippet ws-butler web-mode volatile-highlights use-package undo-tree smex smartparens slack sage-shell-mode ranger racer py-autopep8 prodigy popwin pallet nyan-mode multiple-cursors markdown-mode+ magit jedi init-loader iedit idle-highlight-mode htmlize hlinum helm-gtags flycheck-rust flycheck-pos-tip flycheck-cask fish-mode expand-region exec-path-from-shell dtrt-indent drag-stuff direx dired-ranger darktooth-theme counsel-projectile color-theme-modern clean-aindent-mode anzu ac-math abyss-theme))))
(custom-set-faces
 ;; custom-set-faces was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(linum-highlight-face ((t (:foreground "black" :background "green")))))
