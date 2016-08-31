
;;; flycheck-pos-tip:
;;; --- This Flycheck extension shows errors under point in pos-tip popups.
;;; Code:
(with-eval-after-load 'flycheck
  (flycheck-pos-tip-mode))

(eval-after-load 'flycheck
  '(custom-set-variables
       '(flycheck-display-errors-function #'flycheck-pos-tip-error-messages)))



;;; 04-flycheck.el ends here

