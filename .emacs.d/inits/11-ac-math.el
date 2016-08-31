
;;; ac-math
;;; source: https://www.emacswiki.org/emacs/AutoCompleteSources

(require 'package)
(package-initialize)

(require 'auto-complete)
(require 'auto-complete-config)
(ac-config-default)

(require 'ac-math)
(add-to-list 'ac-modes 'yatex-mode)   ; make auto-complete aware of `yatex-mode`

(defun ac-yatex-mode-setup () ; add ac-sources to default ac-sources
  (setq ac-sources
        (append '(ac-source-math-unicode ac-source-math-latex ac-source-latex-commands)
                ac-sources))
  )
(add-hook 'yatex-mode-hook 'ac-yatex-mode-setup)
(global-auto-complete-mode t)

(setq ac-math-unicode-in-math-p t)

;;; 11-ac-math.el ends here
