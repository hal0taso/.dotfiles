
;;;load a Cask's configuration file

(require 'cask)
(cask-initialize)


;;; init-loader.el

(require 'init-loader)
(init-loader-load "~/.emacs.d/inits")

;;; init.el ends here
