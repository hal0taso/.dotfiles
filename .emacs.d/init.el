
;;;load a Cask's configuration file

(require 'cask "~/.emacs.d/.cask/24.5.1/elpa/cask-20151123.528/cask.el")
(cask-initialize)

;;; init-loader.el

(require 'init-loader)
(init-loader-load "~/.emacs.d/inits")

;;; init.el ends here
