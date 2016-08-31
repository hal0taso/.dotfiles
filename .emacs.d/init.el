
;;;load a Cask's configuration file

;; if you use OSX
(require 'cask)
;; if you use linux
;;(require 'cask"~/.cask/cask.el")

(cask-initialize)

;;; init-loader.el

(require 'init-loader)
(init-loader-load "~/.emacs.d/inits")

;;; color theme

(load-theme 'calm-forest t t)
(enable-theme 'calm-forest)

;;; init.el ends here
