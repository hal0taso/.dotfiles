
;;; - hlinum -
;;;
;;; high-light your current lines
;;;
;;; https://github.com/tom-tan/hlinum-mode


;; 前景色を黒，背景色を緑にします．
(custom-set-faces
 '(linum-highlight-face ((t (:foreground "black"
                                         :background "green")))))

;; 常にhlinum-modeになるように設定します.
(custom-set-variables
  '(global-linum-mode t))
