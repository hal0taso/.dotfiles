;;; 52-sagemath.el
;;;
;;; This is setting script for sage-shell-mode

(setq sage-shell:use-prompt-toolkit nil)

(setq sage-shell:sage-root "/home/ukun/src/sage-8.1")

;; Run SageMath by M-x run-sage instead of M-x sage-shell:run-sage
(sage-shell:define-alias)

;; Turn on eldoc-mode in Sage terminal and in Sage source files
(add-hook 'sage-shell-mode-hook #'eldoc-mode)
(add-hook 'sage-shell:sage-mode-hook #'eldoc-mode)


