
;;参考url:http://qiita.com/masato/items/ef0ffa626ca8bf46bf8a
(setq backup-inhibited t) ;バックアップの保存をしない
(setq next-line-add-newlines nil) ;
(setq-default tab-width 4 indent-tabs-mode nil) ;tabキーは4スペース分

;;これはflycheckの設定
;;参考url:http://qiita.com/senda-akiha/items/cddb02cfdbc0c8c7bc2b
(add-hook 'after-init-hook #'global-flycheck-mode)
;;flake8を追加しなくてもいいのかな？

;;; setting of dired-ranger
(require 'dired)
(define-key dired-mode-map (kbd "W") 'dired-ranger-copy)
(define-key dired-mode-map (kbd "X") 'dired-ranger-move)
(define-key dired-mode-map (kbd "Y") 'dired-ranger-paste)
