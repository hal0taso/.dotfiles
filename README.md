# .dotfiles

## .emacs.d

1. Caskのインストール
`$ curl -fsSL https://raw.githubusercontent.com/cask/cask/master/go | python
`
MacはHomebrewでも導入できます．
`$ brew install cask`

2. curlで導入した場合は，PATHを通す
`$ export PATH="$HOME/.cask/bin:$PATH"`

3. 設定ファイルの再読み込み
`$ source ~/.bashrc`

4. Caskを使ってインストール実行
`$ cd ~/.emacs.d`
`$ cask install`

Caskファイル参照

## .Xdefaults
setting for urxvt

## .conkyrc
setting for conky

## .config
- tint2
    + setting for tint2
- openbox
    + autostart
    + menu.xml
        - main menu
    + debian-menu.xml
        - menu of debian-tab
    + environment
        - empty
    + rc.xml
        - openbox setting( eg. keyboard-shortcut, mouse-bind, window-bar...)

## ranger
