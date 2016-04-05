;; pythonの自動補完パッケージ
;; 参考url: http://qiita.com/yuizho/items/4c121bdecc103109e4fd
;; documentation: http://tkf.github.io/emacs-jedi/latest/
;; source: https://github.com/tkf/emacs-jedi

(add-hook 'python-mode-hook 'jedi:setup)
(setq jedi:complete-on-dot t)
