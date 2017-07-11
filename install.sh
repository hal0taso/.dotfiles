#!/bin/sh

# if you use this function,
# you have to goto directory where it is.
symlink(){
    for file in $@
    do      
        if [! -e $HOME/$file ]; then
            ln -s $(pwd)/$file $HOME/$file
            echo 'linked'
        else
            rm $HOME/$file
            ln -s $(pwd)/$file $HOME/$file
            echo 'rm and linked'
        fi
        echo '[*] $file linked succeeded'
    done
}

export PLATFORM=$(uname)

log(){
    echo "-> " $1
}


if [ $PLATFORM = "Darwin" ]; then 
   echo '' 
fi


if [ $PLATFORM = "Linux" ]; then 
    # for linux environments
    cd ./src/

    echo 'cd ./src/'
    echo 'make symlinks of dotfiles...'
    
    symlink $(ls -aF | cut -f 1 | grep -v / | awk -F\n -v ORS=' ' '{print}' )

    echo 'cd ../'
    cd ../
    
    echo '[*] pip installing...'
    pip install -r requirements.lubuntu

    echo '[*] package installing...'
    cat packagelist | xargs apt-get install
fi

