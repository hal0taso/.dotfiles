
;;;load a Cask's configuration file

;; if you use OSX
(require 'cask)
;; if you use linux
;;(require 'cask"~/.cask/cask.el")

;;; Code:
(cask-initialize)

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

;; shell の存在を確認
(defun skt:shell ()
  (or (executable-find "bash")
      (error "can't find 'shell' command in PATH!!")))

;; Shell 名の設定
(setq shell-file-name (skt:shell))
(setenv "SHELL" shell-file-name)
(setq explicit-shell-file-name shell-file-name)

(set-language-environment  'utf-8)
(prefer-coding-system 'utf-8)

(cond
 ((or (eq window-system 'mac) (eq window-system 'ns))
  ;; Mac OS X の HFS+ ファイルフォーマットではファイル名は NFD (の様な物)で扱うため以下の設定をする必要がある
  (require 'ucs-normalize)
  (setq file-name-coding-system 'utf-8-hfs)
  (setq locale-coding-system 'utf-8-hfs)))

;; shellのlsなどの色設定してると必要らしい．
(autoload 'ansi-color-for-comint-mode-on "ansi-color" nil t)
(add-hook 'shell-mode-hook 'ansi-color-for-comint-mode-on)

;; termの呼び出し
(global-set-key (kbd "C-c t") '(lambda ()
                                (interactive)
                                (term shell-file-name)))

(scroll-bar-mode -1)
(tool-bar-mode -1)
(setq inhibit-startup-screen t)

;;; init-loader.el

(require 'init-loader)
(init-loader-load "~/.emacs.d/inits")

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

;;; init.el ends here

;; change font size
(set-frame-font "Monospace 12")
(put 'upcase-region 'disabled nil)

;;; setting for nnreddit
(require 'nnreddit "~/.emacs.d/inits/99-nnreddit.el")
(add-to-list 'gnus-secondary-select-methods
             '(nnreddit ""))

;;; 括弧の補完
(electric-pair-mode 1)
