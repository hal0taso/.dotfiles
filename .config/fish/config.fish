switch (uname)
case Darwin
#  echo Mac found

  balias updatedb '/usr/libexec/locate.updatedb'  
  balias ls='ls -GP'

  export LSCOLORS=gxfxcxdxbxegedabagacad
  # toilet -F border -f mono9 εβ¦εβ§εβ¤ώΎ΅Ψ --filter gay
  set -x $POWERLINE_TMUX (find /usr/local/ -name 'powerline.conf')

case Linux
 # echo Linux found
 # set POWERLINE path for tmux
 set -x POWERLINE_TMUX (find .local/ -name 'powerline.conf')
end

# function for peco 
function fish_user_key_bindings
  bind \cr 'peco_select_history (commandline -b)'
  bind \c] peco_select_ghq_repository
end

# if launch emacs from tmux,
# launch cli emacs (emacs -nw)
if test -z $TMUX
else
  balias emacs 'emacs -nw'
end


set -g theme_color_scheme terminal