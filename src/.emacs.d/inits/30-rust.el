;;; racerやrustfmt、コンパイラにパスを通す
(add-to-list 'exec-path (expand-file-name "~/.cargo/bin/"))
;;; rust-modeでrust-format-on-saveをtにすると自動でrustfmtが走る
(eval-after-load "rust-mode"
  '(setq-default rust-format-on-save t))
;;; rustのファイルを編集するときにracerとflycheckを起動する
(add-hook 'rust-mode-hook (lambda ()
                            (racer-mode)
                            (flycheck-rust-setup)))
;;; racerのeldocサポートを使う
(add-hook 'racer-mode-hook #'eldoc-mode)
;;; racerの補完サポートを使う
(add-hook 'racer-mode-hook (lambda ()
                             (company-mode)
                             ;;; この辺の設定はお好みで
                             (set (make-variable-buffer-local 'company-idle-delay) 0.1)
                             (set (make-variable-buffer-local 'company-minimum-prefix-length) 0)))
