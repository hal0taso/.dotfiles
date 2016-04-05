;; Python専用バッファビューワー
;; source: https://github.com/tkf/emacs-jedi-direx

(eval-after-load "python"
  '(define-key python-mode-map "\C-cx" 'jedi-direx:pop-to-buffer))
(add-hook 'jedi-mode-hook 'jedi-direx:setup)
