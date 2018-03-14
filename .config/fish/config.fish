switch (uname)
    # For MacOS
    case Darwin

        balias updatedb '/usr/libexec/locate.updatedb'
        balias ls 'ls -GP'
        export LSCOLORS gxfxcxdxbxegedabagacad

        # set environment value for tmux
        set -x POWERLINE_TMUX (mdfind -onlyin /usr/local/ -name 'powerline.conf')

        ## added by Anaconda3 2.5.0 installer
        set -x PATH /Users/hal0taso/anaconda/bin $PATH
        ## added by Anaconda2 4.3.1 installer
        # set -x PATH /Users/hal0taso/anaconda/bin $PATH

        # node.js
        set -x PATH /usr/local/nodejs/bin $PATH

        set -x PAHT /usr/local/opt/python/libexec/bin $PATH

        # Load rbenv automatically by appending
        # the following to ~/.config/fish/config.fish:
        status --is-interactive; and source (rbenv init -|psub)
        # rbenv
        set -x PATH /Users/hal0taso/.rbenv/shims $PATH
        eval (rbenv init - | source)

        # for sagemath
        set -x PATH /Users/hal0taso/.ghq/sage_source/sage-8.1/ $PATH

        set -x PATH /usr/local/Cellar/nmap/7.12/bin/ $PATH

        set -x PATH /usr/bin /usr/sbin /bin /sbin $PATH

        set -x PATH /usr/local/bin $PATH

        set -x PATH /usr/local/sbin $PATH

        set -x PATH /Users/hal0taso/.ghq/sage_source/sage-8.1 $PATH

        set -x PATH $HOME/.cargo/bin/ $PATH

        set -x PYTHONPATH "~/anaconda/pkgs/"

        # set -x PYTHONPATH "/usr/local/lib/python2.7/site-packages"

        # For Linux
    case Linux
        # set POWERLINE path for tmux
        set -x POWERLINE_TMUX (locate 'powerline.conf' | grep tmux)

        set -x PATH $HOME/.go/bin/ $PATH

        set -x PATH $HOME/.go/bin/ $PATH

        set -x PATH $HOME/.cask/bin $PATH

        set -x PATH $HOME/.local/bin/ $PATH

        set -x PATH $HOME/.cargo/bin/ $PATH
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

    function fish_title
        true
    end
end

set -g theme_color_scheme terminal

set -x RUST_SRC_PATH (rustc --print sysroot)/lib/rustlib/src/rust/src

balias emacs 'emacsclient -c -a ""'
