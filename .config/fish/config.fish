switch (uname)
case Darwin
  echo Mac found

  balias updatedb '/usr/libexec/locate.updatedb'

  if test -z $TMUX
  else
    balias emacs 'emacs -nw'
  end
  
  balias ls='ls -GP'

  export LSCOLORS=gxfxcxdxbxegedabagacad
  # toilet -F border -f mono9 ウェイ！w --filter gay

  # function for peco
  function fish_user_key_bindings
    bind \cr 'peco_select_history (commandline -b)'
    bind \c] peco_select_ghq_repository
  end


  
case Linux
  echo Linux found
end

set -g theme_color_scheme terminal