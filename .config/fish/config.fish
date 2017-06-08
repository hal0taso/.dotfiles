balias updatedb='/usr/libexec/locate.updatedb'

balias ls='ls -GP'

export LSCOLORS=gxfxcxdxbxegedabagacad
# toilet -F border -f mono9 ウェイ！w --filter gay

# function for peco
function fish_user_key_bindings
  bind \cr 'peco_select_history (commandline -b)'
  bind \c] peco_select_ghq_repository
end