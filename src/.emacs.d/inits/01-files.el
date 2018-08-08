;;; 参考url:
;;; http://qiita.com/masato/items/ef0ffa626ca8bf46bf8a

;;;Code:
(setq backup-inhibited t) ; バックアップの保存をしない
(setq next-line-add-newlines nil) ;
(setq-default tab-width 4 indent-tabs-mode nil) ;tabキーは4スペース分

;;これはflycheckの設定
;;参考url:http://qiita.com/senda-akiha/items/cddb02cfdbc0c8c7bc2b
(add-hook 'after-init-hook #'global-flycheck-mode)
;;flake8を追加しなくてもいいのかな？


(setq tramp-default-method "ssh")
;;(define-key global-map (kbd "C-c s") 'helm-tramp)

;; (add-hook 'helm-tramp-pre-command-hook '(lambda () (global-aggressive-indent-mode 0)
;;                                           (projectile-mode 0)
;;                                           (editorconfig-mode 0)))
;; (add-hook 'helm-tramp-quit-hook '(lambda () (global-aggressive-indent-mode 1)
;;                                    (projectile-mode 1)
;;                                    (editorconfig-mode 1)))
