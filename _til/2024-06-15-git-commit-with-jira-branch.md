---
layout: post
title: Automate Your Git Commit Messages with JIRA Ticket Numbers
categories: [til]
tags: [til]
fullview: false
excerpt_separator: <!--more-->
excerpt:
   "Adding Git Branch with JIRA Ticket to Commit Messages"
comments: true
---

### Step-by-Step Guide to Adding Git Branch with JIRA Ticket to Commit Messages

In this guide, we'll show you how to streamline your git workflow by automatically including JIRA ticket numbers in your commit messages. Follow these steps to set up a custom git alias that extracts the JIRA ticket number from your branch name and adds it to your commit messages.

#### Step 1: Open Your Git Configuration File

To get started, you need to open your global git configuration file. You can do this using the following command:

```sh
git config --global --edit
```

This command will open your global `.gitconfig` file in your default text editor.

#### Step 2: Define the Git Alias

In the opened `.gitconfig` file, add the following alias under the `[alias]` section. If the `[alias]` section doesn't exist, you can create it.

><i class="far fa-file-code"></i> .gitconfig 
{: .filename }
```bash
[alias]
  commit-jira = "!f() { branch=$(git symbolic-ref --short HEAD); if [[ $branch =~ ([A-Z0-9]+-[0-9]+) ]]; then ticket=\"${BASH_REMATCH[1]}\"; git commit -m \"$ticket $1\"; else echo \"No JIRA ticket found in branch name.\"; fi; }; f"
```

#### Step 3: Save and Close the Configuration File

After adding the alias, save and close the `.gitconfig` file. This alias defines a custom command `commit-jira` that you can now use in your git workflow.

#### Step 4: Use the New Alias in Your Git Workflow

To use the new alias, make sure you are on a branch that follows the JIRA ticket naming convention (e.g., `ABC-1234-feature-description`).

When you want to commit changes, use the new alias like this:

```sh
git commit-jira "your commit message"
```

This will automatically prepend the JIRA ticket number extracted from the branch name to your commit message.

#### Example

If your branch name is `ABC-1234-feature-description` and you run:

```sh
git commit-jira "fixed the navigation issue"
```

The resulting commit message will be:

```
ABC-1234 fixed the navigation issue
```

#### Summary

By following these steps, you can automate the inclusion of JIRA ticket numbers in your commit messages, ensuring consistent and informative commit histories. This small improvement can significantly enhance your development workflow, making it easier to track changes related to specific JIRA tickets.

Happy committing!