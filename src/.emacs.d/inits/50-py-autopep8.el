;;; py-autopep8

(add-hook 'python-mode-hook
          '(lambda()
             ; バッファ全体のコード整形
             (define-key python-mode-map (kbd "C-c F") 'py-autopep8)
             ; 選択リジョンないのコード整形
             (define-key python-mode-map (kbd "C-c f") 'py-autopep8-region)))

;; 保存時にバッファ全体を自動整形する
(add-hook 'before-save-hook 'py-autopep8-before-save)

;;整形の時に制限を99文字に緩和
(setq py-autopep8-options '("--max-line-length=99"))
