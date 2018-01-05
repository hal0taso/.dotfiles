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
  (set-frame-font "Monospace 12")
  (define-key global-map (kbd "C-c RET") 'set-mark-command)
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

(when (eq system-type 'gnu/linux)
  ;; eneble to use mozc for ime
  (require 'mozc)
  (set-language-environment "Japanese")
  (setq default-input-method "japanese-mozc")
  (set-buffer-file-coding-system 'utf-8)
  )


;;; init-loader.el
(require 'init-loader)
(init-loader-load "~/.emacs.d/inits")


;; 参考http://sakito.jp/emacs/emacsshell.html
;; より下に記述した物が PATH の先頭に追加されます
(dolist (dir (list
              "/sbin"
              "/usr/sbin"
              "/bin"
              "/usr/bin"
              "/opt/local/bin"
              "/sw/bin"
              "/usr/local/bin"
              (expand-file-name "~/bin")
              (expand-file-name "~/.emacs.d/bin")
              ))
 ;; PATH と exec-path に同じ物を追加します
 (when (and (file-exists-p dir) (not (member dir exec-path)))
   (setenv "PATH" (concat dir ":" (getenv "PATH")))
   (setq exec-path (append (list dir) exec-path))))

(setenv "MANPATH" (concat "/usr/local/man:/usr/share/man:/usr/share/man" (getenv "MANPATH")))

;; ;; shell の存在を確認
;; (defun skt:shell ()
;;   (or (executable-find "fish")
;;       (error "can't find 'shell' command in PATH!!")))

;; ;; Shell 名の設定
;; (setq shell-file-name (skt:shell))
;; (setenv "SHELL" shell-file-name)
;; (setq explicit-shell-file-name shell-file-name)

;; ;; set coding system utf-8
;; (set-language-environment  'utf-8)
;; (prefer-coding-system 'utf-8)

(cond
 ((or (eq window-system 'mac) (eq window-system 'ns))
  ;; Mac OS X の HFS+ ファイルフォーマットではファイル名は NFD (の様な物)で扱うため以下の設定をする必要がある
  (require 'ucs-normalize)
  (setq file-name-coding-system 'utf-8-hfs)
  (setq locale-coding-system 'utf-8-hfs))
 )

;; ;; termの呼び出し
;; (global-set-key (kbd "C-c t") '(lambda ()
;;                                 (interactive)
;;                                 (term shell-file-name)))


;; shellのlsなどの色設定してると必要らしい．
(autoload 'ansi-color-for-comint-mode-on "ansi-color" nil t)
(add-hook 'shell-mode-hook 'ansi-color-for-comint-mode-on)


(scroll-bar-mode -1)
(tool-bar-mode -1)

(setq inhibit-startup-screen t)
(require 'whitespace)

;;; color theme

(load-theme 'darktooth t t)
(enable-theme 'darktooth)

;; 透明度を変更するコマンド M-x set-alpha
;; http://qiita.com/marcy@github/items/ba0d018a03381a964f24
(defun set-alpha (alpha-num)
  "set frame parameter 'alpha"
  (interactive "nAlpha: ")
  (set-frame-parameter nil 'alpha (cons alpha-num '(90))))



;; default window alpha
(set-frame-parameter nil 'alpha 95)


;; change font size
(put 'upcase-region 'disabled nil)

;; C-h to backspace and C-? to help command
(keyboard-translate ?\C-h ?\C-?)
(global-set-key (kbd "C-?") 'help-for-help)


;; enable type nn to japanse
;; (setq quail-japanese-use-double-n t)

;;; setting for nnreddit
(require 'nnreddit "~/.emacs.d/inits/99-nnreddit.el")
(add-to-list 'gnus-secondary-select-methods
             '(nnreddit ""))

;;; 括弧の補完
(electric-pair-mode 1)

;;; init.el ends here
(custom-set-variables
 ;; custom-set-variables was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(ede-project-directories
   (quote
    ("/home/ukun/.ghq/github.com/hal0taso/cpp_samples/chap01")))
 '(flycheck-display-errors-function (function flycheck-pos-tip-error-messages))
 '(global-linum-mode t)
 '(helm-gtags-auto-update t)
 '(helm-gtags-ignore-case t)
 '(helm-gtags-path-style (quote relative))
 '(helm-gtags-suggested-key-mapping t)
 '(package-selected-packages
   (quote
    (org-link-minor-mode go-complete go-mode iedit anzu ws-butler dtrt-indent clean-aindent-mode undo-tree volatile-highlights helm-projectile helm-swoop zygospore company dired-subtree yatex yasnippet web-mode use-package smex smartparens slack py-autopep8 projectile prodigy popwin pallet nyan-mode multiple-cursors markdown-mode+ magit jedi init-loader idle-highlight-mode htmlize hlinum helm-gtags flycheck-pos-tip flycheck-cask fish-mode expand-region exec-path-from-shell drag-stuff direx dired-ranger darktooth-theme color-theme-modern ac-math abyss-theme))))
(custom-set-faces
 ;; custom-set-faces was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(linum-highlight-face ((t (:foreground "black" :background "green")))))


;; you can move buffer using arrow-key
(defun ignore-error-wrapper (fn)
  "Funtion return new function that ignore errors.
   The function wraps a function with `ignore-errors' macro."
  (lexical-let ((fn fn))
    (lambda ()
      (interactive)
      (ignore-errors
        (funcall fn)))))

(global-set-key [s-left] (ignore-error-wrapper 'windmove-left))
(global-set-key [s-right] (ignore-error-wrapper 'windmove-right))
(global-set-key [s-up] (ignore-error-wrapper 'windmove-up))
(global-set-key [s-down] (ignore-error-wrapper 'windmove-down))