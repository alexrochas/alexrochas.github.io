---
layout: post
title: "Node and Ruby Versions to Your Terminal Prompt"
date: 2024-06-24
excerpt: "Learn how to customize your terminal prompt to display Node.js and Ruby versions with Oh My Zsh."
tags: [Oh My Zsh, Terminal, Node.js, Ruby]
---

Today I learned how to customize my terminal prompt using Oh My Zsh to display the Node.js and Ruby versions if specific files are present in the current or any parent directory. This customization can be very handy for developers who frequently switch between projects and need to quickly see the version of Node.js or Ruby they are working with.

Here's a step-by-step guide on how to set up this custom prompt.

## Step 1: Create a Custom Theme

First, create a new custom theme file for Oh My Zsh. You can name this file `mycustomprompt.zsh-theme` and save it in the `~/.oh-my-zsh/themes/` directory.

```sh
touch ~/.oh-my-zsh/themes/mycustomprompt.zsh-theme
```

## Step 2: Define Functions for Node and Ruby Versions

In the newly created theme file, define functions to check for `package.json` and `Gemfile` in the current directory and all parent directories. These functions will output the Node.js and Ruby versions respectively.

```sh
function node_version() {
    local current_dir=$(pwd)
    local blue="%{$fg[blue]%}"
    local red="%{$fg[red]%}"
    local reset="%{$reset_color%}"
    while [ "$current_dir" != "/" ]; do
        if [ -f "$current_dir/package.json" ]; then
            echo "${blue}node:(${reset}${red}$(node -v)${blue})${reset} "
            return
        fi
        current_dir=$(dirname "$current_dir")
    done
}

function ruby_version() {
    local current_dir=$(pwd)
    local blue="%{$fg[blue]%}"
    local red="%{$fg[red]%}"
    local reset="%{$reset_color%}"
    while [ "$current_dir" != "/" ]; do
        if [ -f "$current_dir/Gemfile" ]; then
            echo "${blue}ruby:(${reset}${red}$(ruby -v | awk '{print $2}')${blue})${reset} "
            return
        fi
        current_dir=$(dirname "$current_dir")
    done
}
```

## Step 3: Configure the Prompt

Next, update the `PROMPT` variable in your custom theme file to include the output of these functions, along with your Git status if you use one.

```sh
PROMPT="%(?:%{$fg_bold[green]%}➜ :%{$fg_bold[red]%}➜ ) %{$fg[cyan]%}%c%{$reset_color%}"
PROMPT+=' $(node_version)$(ruby_version)$(git_prompt_info)'

ZSH_THEME_GIT_PROMPT_PREFIX="%{$fg_bold[blue]%}git:(%{$fg[red]%}"
ZSH_THEME_GIT_PROMPT_SUFFIX="%{$reset_color%} "
ZSH_THEME_GIT_PROMPT_DIRTY="%{$fg[blue]%}) %{$fg[yellow]%}✗"
ZSH_THEME_GIT_PROMPT_CLEAN="%{$fg[blue]%})"
```

## Step 4: Apply the Custom Theme

To use your new custom theme, update the `ZSH_THEME` variable in your `.zshrc` file to point to your custom theme.

```sh
ZSH_THEME="mycustomprompt"
```

After making this change, reload your `.zshrc` file to apply the new theme:

```sh
source ~/.zshrc
```

## Conclusion

With these steps, your terminal prompt will now display the Node.js and Ruby versions whenever you are in a directory (or any parent directory) that contains a `package.json` or `Gemfile`, respectively. This setup is especially useful for developers working on multiple projects with different dependencies.

Here's the complete code for the custom theme file `mycustomprompt.zsh-theme`:

><i class="far fa-file-code"></i> mycustomprompt.zsh-theme  
{: .filename }
```sh
function node_version() {
    local current_dir=$(pwd)
    local blue="%{$fg[blue]%}"
    local red="%{$fg[red]%}"
    local reset="%{$reset_color%}"
    while [ "$current_dir" != "/" ]; do
        if [ -f "$current_dir/package.json" ]; then
            echo "${blue}node:(${reset}${red}$(node -v)${blue})${reset} "
            return
        fi
        current_dir=$(dirname "$current_dir")
    done
}

function ruby_version() {
    local current_dir=$(pwd)
    local blue="%{$fg[blue]%}"
    local red="%{$fg[red]%}"
    local reset="%{$reset_color%}"
    while [ "$current_dir" != "/" ]; do
        if [ -f "$current_dir/Gemfile" ]; then
            echo "${blue}ruby:(${reset}${red}$(ruby -v | awk '{print $2}')${blue})${reset} "
            return
        fi
        current_dir=$(dirname "$current_dir")
    done
}

PROMPT="%(?:%{$fg_bold[green]%}➜ :%{$fg_bold[red]%}➜ ) %{$fg[cyan]%}%c%{$reset_color%}"
PROMPT+=' $(node_version)$(ruby_version)$(git_prompt_info)'

ZSH_THEME_GIT_PROMPT_PREFIX="%{$fg_bold[blue]%}git:(%{$fg[red]%}"
ZSH_THEME_GIT_PROMPT_SUFFIX="%{$reset_color%} "
ZSH_THEME_GIT_PROMPT_DIRTY="%{$fg[blue]%}) %{$fg[yellow]%}✗"
ZSH_THEME_GIT_PROMPT_CLEAN="%{$fg[blue]%})"
```

And remember to set `ZSH_THEME="mycustomprompt"` in your `.zshrc`.

Happy coding!
