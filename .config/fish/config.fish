switch (uname)
  # For MacOS
  case Darwin

    balias updatedb '/usr/libexec/locate.updatedb'  
    balias ls 'ls -GP'

    export LSCOLORS gxfxcxdxbxegedabagacad

    # set environment value for tmux
    set -x POWERLINE_TMUX (mdfind -onlyin /usr/local/ -name 'powerline.conf')

    # added by Anaconda3 2.5.0 installer
    set -x PATH /Users/hal0taso/anaconda/bin $PATH
      
    set -x PATH /usr/local/Cellar/nmap/7.12/bin/ $PATH
         
    set -x PATH /usr/bin /usr/sbin /bin /sbin $PATH

    set -x PATH /usr/local/bin $PATH

    set -x PATH /usr/local/sbin $PATH

    # node.js
    set -x PATH /usr/local/nodejs/bin $PATH

    # added by Anaconda2 4.3.1 installer
    set -x PATH /Users/hal0taso/anaconda/bin $PATH

  # For Linux
  case Linux
   
    # set POWERLINE path for tmux
    set -x POWERLINE_TMUX (locate -qbql 1 'powerline.conf')
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

if test -n '$EMACS'
  function fish_right_prompt; end  
end


set -g theme_color_scheme terminal
