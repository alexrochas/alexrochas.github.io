---
layout: post
title: The Git TAO 
categories: [general]
tags: [git, best practices]
fullview: false
excerpt_separator: <!--more-->
excerpt:
    Here are my top 6 behaviors a good developer must have when using Git.
comments: true
image: https://cdn-images-1.medium.com/max/2000/1*scAYNyWlof1odFBfsdlHIA.jpeg
feature_img: https://cdn-images-1.medium.com/max/2000/1*scAYNyWlof1odFBfsdlHIA.jpeg
---

![cover](https://cdn-images-1.medium.com/max/2000/1*scAYNyWlof1odFBfsdlHIA.jpeg){: .center }

I worked with versioning tools since 2006. Already worked with CVS, Subversion and from 2011 until now with Git.

Thing is, with my experience, I managed to identify some common behaviors in developers when using Git or migrating the first time to Git. Here are my top 6 behaviors a good developer must have when using Git.

1. Be semantic

1. Be consistent

1. Be predictable

1. Don’t use force-push

1. Re-base it, don’t merge it

1. Be lazy

### 1 — Be semantic

Who never saw a list of commits with descriptions like:

* “Tests”

* “More tests”

* “Working”

* “Deploy”

Come’on, those descriptions doesn't say anything, for me and in approximately 20 min even you will don’t remember about which tests that commit is talking about. Semantic is the key for a good communication, not just between the team but for history purposes. You will be interested on semantic when you need to find your work on the git log.

Looking further for that you can use a lot, believe-me “a lot”, of plugins that help your laziness. Like this one [https://github.com/alexrochas/zsh-git-semantic-commits](https://github.com/alexrochas/zsh-git-semantic-commits) forked from another similar project in order to create a ZSH plugin.

### 2 — Be consistent

Once your team decide a convention, stick to that! Doesn't matter if the flow is Git flow, Github flow, trunk based or wherever, stick to what your team decide it.

I kinda of tired to work in projects with Github flow (for example) where feature/branch are the rules until we are in deployment and something goes wrong.

![I love this dog.](https://cdn-images-1.medium.com/max/2000/0*pr_gbAwD3NBL7-Xa.png){: .center }
*I love this dog.*{: .quote }

Let’s do a quickly review. If your team decide to use Github flow, probably they have some deploy pipeline right? What is on master is the same that is on production maybe and send something directly to master means take a shortcut between some automated tests. Looks fine from here right?

### 3 — Be predictable

Whenever someone calls me to help with git, I suppose you didn’t kick the source tree with both legs. Git does’t loose anything, and by experience I say again, “Git does’t loose anything”. You’re responsible for always loose.

There you are, in some really big problem with git, something that started with some re-base conflicts or maybe your local source tree is wrong, or all you wanted to do was a re-base but you forgot the flag. In your life, you don’t cut a leg every time you take a wrong step, you always take a step back before go again. Same with git.

Git merge, git re-base and other commands have the flag abort. Before deleting everything, put all the changes in something mystical like “stash”, cloning the project again or reboot your PC. Try just to undo what you just did.

And if nothing works I always will be able to look the mess you did with “git reflog”.

### 4 — Don’t use force-push.

![Yeah, maybe on Star Wars, but please, not in git.](https://cdn-images-1.medium.com/max/2000/0*MkgWsktliD18GYml.jpg){: .center }
*Yeah, maybe on Star Wars, but please, not in git.*{: .quote }

You just finished your job, worked a stressful week on that and are pretty confident about your code and that this will probably make the world a better place. But wait, you have some errors when trying to push your code. Something about difference with the HEAD? Ok, you don’t right understand the conflicts and a post on SlackOverflow just said that to resolve this you should use “the force”.

Think git like a tree. Every commit is stacked above the last one. Now you use the force.

![](https://cdn-images-1.medium.com/max/2000/0*XKBZ4TN96QDFTVAd.jpg){: .center }

Update your code with the remote branch before push. Also, independent of the method your team decide to use. You really should maintain your code constantly updated with the remote branches.

### 5— Re-base it, don’t merge it

Now you don’t try to force anything that is not Star Wars related. But when you do pulls, you always take some pretty effort to merge those twenty and something files and always mess up with the tree creating a lot of unnecessary merge commits and omitting the merged branch commits.

Re-base to the rescue, the main feature of re-base is, re-base will look for the first commit in common. From that it will apply the remote commits and after that you local commits, one-by-one. You still will have conflicts, probably, but you will have to deal with them one-by-one.

![](https://cdn-images-1.medium.com/max/2000/0*13W25Gjh1ojzPL_T.png){: .center }

Also, it keeps your history coherent.

### 6 — Be lazy

I worked with Linux almost double the time I know Git and something I learned with that is, a good programmer is a lazy programmer.
> “a good programmer is a lazy programmer”

Working with Linux, made me do, until today, almost 30 or 40 tools between Git tools, terminal tools, alias and other stuff. I can say that if you do something more often, this probably can be automatized.

### Where to go from here?

I really like this kind of session and here my tips.

* my Github [https://github.com/alexrochas](https://github.com/alexrochas), maybe you find something useful (yeah, self promoting)

* this [http://ndpsoftware.com/git-cheatsheet.html](http://ndpsoftware.com/git-cheatsheet.html) that was what I most used long ago to understand the flow and how to undo the daily mess.

* [https://github.com/alexrochas/git-logger](https://github.com/alexrochas/git-logger), a project to collect the use of git and with that be able to create more “how-to” posts or tools to do the world a better place.

Finally, git is amazing and immense. Study it a little and I’m sure that you and your team mattes will not regret.
