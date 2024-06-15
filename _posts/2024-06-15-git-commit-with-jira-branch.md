---
layout: post
title: Jekyll and social metatags
categories: [posts]
tags: [til]
fullview: false
excerpt_separator: <!--more-->
excerpt:
   "improve your Jekyll post visibility"
comments: true
image: /assets/media/social-engagement-thumb.png
feature_img: /assets/media/social-engagement-thumb.png
---

Recently I decided to give a push in my social engagement and personal merketing by creating more visibility to my tech blog and other fresh started project. It was a surprise for me that this whole time I was sharing posts with this look:

![twitter-ugly-thumb](/assets/media/twitter-ugly-thumb.png){: .center}
*besides the politeness it's not really attractive for a click*{: .quote}

I discovered then the my Jekyl static blog (yes, it's important to point the whole scenario) was missing the metatags that most of social networks look for when creating a thumbnail.  Something like:

><i class="far fa-file-code"></i> index.html 
{: .filename }
```xml
<meta property="og:type" content="article" />
<meta property="og:url" content="http://conductofcode.io/post/social-meta-tags-with-jekyll/" />
<meta property="og:title" content="Social meta tags with Jekyll" />
<meta property="og:description" content="This is how I added social meta tags to this Jekyll blog to optimize sharing on Facebook, Twitter and Google+." />
<meta property="og:image" content="http://conductofcode.io/post/social-meta-tags-with-jekyll/meta.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:site_name" content="Conduct of Code" />
```

By seeing that the next clever step would be create a helper method on my Jekyll website and add to each one of my posts or even add to the header (some "clean code" here?). But before loose more time with that I found the right way to do it.

There is a Jekyll plugin, supported by github-pages, called [jekyll-seo-tags](https://rubygems.org/gems/jekyll-seo-tag). (that is already bundled if you're using [github-pages](https://rubygems.org/gems/github-pages) gem)

><i class="far fa-file-code"></i> Gemfile
{: .filename }
```ruby
# frozen_string_literal: true

source 'https://rubygems.org'

gem 'github-pages' # jekyll-seo-tags is already bundled in this gem
gem 'jekyll', '>= 3.6.3'

group :jekyll_plugins do
  gem 'jekyll-paginate'
  gem 'jekyll-admin'
end
```

This plugin will add a new method that you should use in your default/template/index page, choose one that is used everywhere, to inside the head tag:

><i class="far fa-file-code"></i> default.html
{: .filename }
```xml
<head>
	<meta charset="utf-8">
	<title>{{ page.title }}</title>
	{% if page.description %}
	<meta name="description" content="{{ page.description }}">
	{% endif %}
	<meta name="author" content="{{ site.author.name }}">

		<!-- stuff... -->

	<link rel="alternate" type="application/rss+xml" title="{{ site.name }}" href="{{ site.BASE_PATH }}/feed.xml">

    {% raw %}
        {% seo %} <!-- here is the magic trick -->
        {% include head.html %}
    {% endraw %}
</head>
```

After that, I tried to oncemore with twitter and now looks like something I may click:

![simple-thumb](/assets/media/simple-thumb.png){: .center}

And if you're missing a beatiful image on the thumbnail just add to your post header the image key:

><i class="far fa-file-code"></i> a-post.md
{: .filename }
```
---
layout: post
title: Event Sourcing - an evolutionary perspective
categories: [general]
tags: [event sourcing]
fullview: false
excerpt_separator: <!--more-->
excerpt:
    "The highs and lows of an event sourcing architecture"
comments: true
image: https://cdn-images-1.medium.com/max/2000/0*WdYZ4xKi-0jFdqj4.jpg
---
```

The result should look something like this:

![full-thumb](/assets/media/full-thumb.png){: .center}

Now this is something I would click!

Resources:

* [card validator I used to preview my cards](https://cards-dev.twitter.com/validator)
* [github-pages supported plugins](https://pages.github.com/versions/)
* [some insights about jekyll-seo-tag](https://conductofcode.io/post/social-meta-tags-with-jekyll/)
* [what is twitter-cards?](https://maxchadwick.xyz/blog/twitter-cards-for-jekyll-with-jekyll-seo-tag)

