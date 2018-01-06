;;;jedi - python auto-complete


;;; Code:
(autoload 'jedi:setup "jedi" nil t)

(add-hook 'python-mode-hook 'jedi:setup)
;;; Code

;;; 51-jediconf.el ends here
