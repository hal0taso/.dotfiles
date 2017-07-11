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