;;; add hook flycheck when u use c-mode

(add-hook 'c-mode-common-hook 'flycheck-mode)


;;; setting of 'semantic-refactor'

(add-hook 'c-mode-common-hook
          '(lambda()
             (define-key c-mode-map (kbd "M-RET") 'srefactor-refactor-at-point)
             (define-key c++-mode-map (kbd "M-RET") 'srefactor-refactor-at-point)))

;;; 20-cpp.el ends here
