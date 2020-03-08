---
layout: post
title: Recover the sanity of your ZSH config 
categories: [general]
tags: [best practices, zsh, terminal]
fullview: false
excerpt_separator: <!--more-->
excerpt:
    There is still hope to your ZSH config
comments: true
---

I started to work with Linux almost 10 years ago, and back there I discovered how my Ubuntu/Debian terminal could make a lot more for me if I start to personalize him. Started with little things, an alias, a shortcut or maybe an environment variable here or there.

```shell 
function whichPort() { 
    lsof -i tcp:$1; 
}

alias zshconfig='vim ~/.zshrc'
alias vimrc='vim ~/.vimrc'
alias i3config='vim ~/.i3/config'
alias git='nocorrect git'
alias environment='sudo vim /etc/environment'
alias xsessionconf='vim ~/.xsession'
alias tasks='task list'
alias sudo='sudo -E '

jp2a --fill --background=light --fill ~/Pictures/supermanLogo.jpeg

task calendar

fortune 30% debian-hints 30% brasil 40% riddles

echo -e "\"You either die a hero or you live long enough to see yourself become the villain.\"\n\n~ Harvey Dent\n"

export PATH="$PATH:$HOME/.rvm/bin" # Add RVM to PATH for scripting
export GOPATH=$HOME/go
export GOBIN=$HOME/go/bin
```

But at some point, my *.zshrc* had 200 lines and my feeling was that I could not maintain it anymore.

![“First months vs first years” by [imgflip](https://imgflip.com/)](https://cdn-images-1.medium.com/max/2000/1*h5sBD-26TGNiQk65Az5Qeg.jpeg){: .center }
*“First months vs first years” by [imgflip](https://imgflip.com/)*{: .quote }

## First step — add a package manager

I heard once that:
> “A good developer is a lazy developer.”

And for me, this means automatize as much as possible in terms of my terminal. With years I started to have plugins for everything, from a beautiful PS1 line to a script to extract any compressed format.

Stop to deal with that manually and use a package manager! In my case, I started to use antigen and now my plugins block looks like that:

```shell 

source /home/alex/Development/antigen/antigen.zsh

# Load the oh-my-zsh's library.
antigen use oh-my-zsh

# Bundles from the default repo (robbyrussell's oh-my-zsh).
antigen bundle git
antigen bundle zsh-users/zsh-completions
antigen bundle heroku
antigen bundle pip
antigen bundle lein
antigen bundle command-not-found
antigen bundle gradle

# Syntax highlighting bundle.
antigen bundle zsh-users/zsh-syntax-highlighting

# Load the theme.
# You probably will want to install powerline fonts https://github.com/powerline/fonts
antigen theme robbyrussell/oh-my-zsh themes/agnoster

# Tell antigen that you're done.
antigen apply
```

## Second step — componentize your .zshrc

You can add practically anything to your *.zshrc* in order to automatize your tasks and for me, these means have a lot of things that don't really fit with each other.

```shell 
source /home/alex/Development/antigen/antigen.zsh

# Load the oh-my-zsh's library.
antigen use oh-my-zsh

# Bundles from the default repo (robbyrussell's oh-my-zsh).
antigen bundle git
antigen bundle heroku
antigen bundle pip
antigen bundle lein
antigen bundle command-not-found

# Syntax highlighting bundle.
antigen bundle zsh-users/zsh-syntax-highlighting

# Load the theme.
antigen theme robbyrussell/oh-my-zsh themes/apple

# Tell antigen that you're done.
antigen apply

# Functions
ex() {
    if [[ -f $1 ]]; then
        case $1 in
            *.tar.bz2) tar xvjf $1;;
            *.tar.gz) tar xvzf $1;;
            *.tar.xz) tar xvJf $1;;
            *.tar.lzma) tar --lzma xvf $1;;
            *.bz2) bunzip $1;;
            *.rar) unrar $1;;
            *.gz) gunzip $1;;
            *.tar) tar xvf $1;;
            *.tbz2) tar xvjf $1;;
            *.tgz) tar xvzf $1;;
            *.zip) unzip $1;;
            *.Z) uncompress $1;;
            *.7z) 7z x $1;;
            *.dmg) hdiutul mount $1;; # mount OS X disk images
            *) echo "'$1' cannot be extracted via >ex<";;
  esac
    else
        echo "'$1' is not a valid file"
    fi
}

# Aliases
alias filemanager='pcmanfm'
alias zshmytheme='vim ~/.oh-my-zsh/themes/alex.zsh-theme'
alias zshconfig='vim ~/.zshrc'
alias vimrc='vim ~/.vimrc'
alias i3config='vim ~/.i3/config'
alias git='nocorrect git'
alias environment='sudo vim /etc/environment'
alias xsessionconf='vim ~/.xsession'
alias sudo='sudo -E '
alias rundashboard='python ~/Development/jenkins_test/dashboard/run.py --config ~/Development/jenkins_test/dashboard/docs/config.json --debug'
alias workpy='workon dashboard'
alias notebook='jupyter notebook'
alias clipboard='xsel -b'

# Fortunes
# fortune 30% debian-hints 30% brasil 40% riddles

# Messages
echo -e "\n\"Agora é o lugar onde as perguntas descansam e as respostas crescem, nos seus próprios tempos…\"\n\n~ Jeff Foster, \"Slow Down, Friend\"\n"
echo -e "\"You either die a hero or you live long enough to see yourself become the villain.\"\n\n~ Harvey Dent\n"

export PATH="$PATH:$HOME/.rvm/bin" # Add RVM to PATH for scripting
export WORKON_HOME=$HOME/.virtualenvs
export PROJECT_HOME=$HOME/Develop
source /usr/local/bin/virtualenvwrapper.sh
export  PYTHONPATH=$PYTHONPATH:/apps/tools/scm_tools/scm_common/python/
```

And by extracting things to similar domains by simply checking if the script exists, I’m able to add and remove sensible code or proprietary configurations deleting an import. And that mess turns into this:

```shell 
# Antigen
[[ -f ~/.zsh/antigen.zsh ]] && source ~/.zsh/antigen.zsh

# Aliases
[[ -f ~/.zsh/aliases.zsh ]] && source ~/.zsh/aliases.zsh

# Quotes
[[ -f ~/.zsh/quotes.zsh ]] && source ~/.zsh/quotes.zsh

# RVM
[[ -f ~/.zsh/rvm.zsh ]] && source ~/.zsh/rvm.zsh

# Functions
[[ -f ~/.zsh/functions.zsh ]] && source ~/.zsh/functions.zsh

# Company stuff (generally AWS stuff that doesn't go to github)
[[ -f ~/.zsh/company.zsh ]] && source ~/.zsh/company.zsh
```

## Bonus steps

### Create your own plugins

Antigen has a nice approach to plugins, you can reference and import any GitHub repository that has **.zsh** extensions and load on your session.

That old functions you lost in your *.zshrc *can become a GitHub repository and not only be shared but pretty well organized inside your system.

```shell 
#!/bin/zsh

function extract {
    if [[ -f $1 ]]; then
        case $1 in
            *.tar.bz2) tar xvjf $1;;
            *.tar.gz) tar xvzf $1;;
            *.tar.xz) tar xvJf $1;;
            *.tar.lzma) tar --lzma xvf $1;;
            *.bz2) bunzip $1;;
            *.rar) unrar $1;;
            *.gz) gunzip $1;;
            *.tar) tar xvf $1;;
            *.tbz2) tar xvjf $1;;
            *.tgz) tar xvzf $1;;
            *.zip) unzip $1;;
            *.Z) uncompress $1;;
            *.7z) 7z x $1;;
            *.dmg) hdiutul mount $1;; # mount OS X disk images
            *) echo "'$1' cannot be extracted via >ex<";;
  esac
    else
        echo "'$1' is not a valid file"
    fi
}
```

### Homesick

[Homesick](https://github.com/technicalpickles/homesick) is the way I found to automatize the installation of my dotfiles whenever I had to in simple steps.

    ~/$ homesick clone [alexrochas/dotfiles](https://github.com/alexrochas/dotfiles)

    ~/$ homesick link dotfiles

I know, there is a lot of creative ways to do that, but I really liked this one and extend this for almost every dotfile I had.

* [https://github.com/alexrochas/dotfiles](https://github.com/alexrochas/dotfiles)

* [https://github.com/alexrochas/X-dotfiles](https://github.com/alexrochas/X-dotfiles)

* [https://github.com/alexrochas/i3-dotfiles](https://github.com/alexrochas/i3-dotfiles)

**Powerline**

[Powerline](https://github.com/powerline/powerline) is a theme for ZSH that does exactly what I need. Again, I liked so much that I even installed on my *.vimr*c.

![“powerline example” by [powerline9k](https://github.com/bhilburn/powerlevel9k)](https://cdn-images-1.medium.com/max/2000/1*foOnmV5GeF61YDq5SZxvZw.png)*“powerline example” by [powerline9k](https://github.com/bhilburn/powerlevel9k)*

### Z

You may already hear that “z is the new j”. Well, [Z](https://github.com/rupa/z) is a tool to navigate between folder in a faster peace.

Instead of:

    ~/$ cd ./Development/ProjectX/some/folder/
    

You can just:

    ~/$ z proj fol             #and let z resolves the pattern

![“mudra” by [vistataos](https://www.vistataos.com/4-types-of-holistic-therapies-to-enhance-your-recovery/)](https://cdn-images-1.medium.com/max/2000/1*UnRLMDLVJGtKhErxwDABbw.jpeg){: .center }
*“mudra” by [vistataos](https://www.vistataos.com/4-types-of-holistic-therapies-to-enhance-your-recovery/)*{: .quote }

The best approach at the end is the one that works for you. Doesn’t matter if it is bash, zsh, fish or whatever. The important thing is to try to work in smart ways.

What do you think? I forgot something or you found a different way? Let me know in the comments and check my [dotfiles](https://github.com/alexrochas/dotfiles) in GitHub.
