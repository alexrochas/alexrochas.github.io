---
layout: post
title: How-to write your first ruby gem
categories: [development]
tags: [ruby, development, rubygems]
fullview: false
excerpt_separator: <!--more-->
excerpt:
    “Unpack the mystery behind what’s in a RubyGem.” ~ Rubygems
comments: true
---

![cover]({{ site.url }}/assets/media/ruby-banner.png)
{:style="text-align: center"}

### What is a gem? ###

The main idea to understand the concept of gem is thinking in that as a Ruby plugin.
Before gems, already existed the concept of plugin in ruby, however they should be
fully included in code and also the work to maintain and update was completely manual.

So, "gem" was created as a way to isolate, decouple and versioning code in a practical way as a dependency.
Usually, gem is used with bundler (another gem that has the role of package manager)
that with your Gemfile install all dependencies declared with the specified versions.

### Pipeme gem ###

Generally, we say that if you see yourself repeating code in more than one place or even in more than one project,
this is probably a pretty good candidate to become a gem. Even if we assume that
the code will be reused is not always enough for creating a gem.

I created **pipeme** thinking about it, already used the same solution at least in two or three
other projects and decide that probably it should be a gem.
Pipeme, is a simple gem that when added to your projects lets you concatenate procedures. Almost like shell do with **pipes**.

### How was done? ###

First of all, we need to be certified that we have **bundler** installed.

```shell
$ gem install bundler
```

Once installed, we can create the boilerplate to **pipeme** gem.

```shell
$ bundler gem pipeme
```

This creates the minimum needed to publish a new gem.

```shell
$ tree pipeme
pipeme
├── .gitignore
├── Gemfile
├── LICENSE.txt
├── README.md
├── Rakefile
├── pipeme.gemspec
└── lib
    ├── pipeme
    │   └── version.rb
    └── pipeme.rb
```

From file to file, we first have pipeme.gemspec that is where are the metadata of our gem like
name, version, license and dependencies with other gems. This file also specify where the
source files are and the executables that will be added to our **path/bin**.

{% highlight ruby linenos %}
# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'pipeme/version'

Gem::Specification.new do |spec|
  spec.name          = "pipeme"
  spec.version       = Pipeme::VERSION
  spec.authors       = ["Alex Rocha"]
  spec.email         = ["alex.rochas@yahoo.com.br"]

  spec.summary       = "Add a more functional approach to your Ruby projects"
  spec.description   = "Add pipe functionality as '>>' to Object class"
  spec.homepage      = "https://github.com/alexrochas/pipeme"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.12"
  spec.add_development_dependency "rake", "~> 10.0"
end
{% endhighlight %}

Note that the line "spec.version" have Pipeme::VERSION. This happens because we
are retrieving the version from the file **version.rb** that has the this information for our gem.
This should be updated at every publish for our gem. So, **lib/pipeme/version.rb**.

{% highlight ruby %}
module Pipeme
  VERSION = "0.1.0"
end
{% endhighlight %}

An extra point to be careful is to use semantic versioning (good read [http://semver.org/](http://semver.org/)) that in
essence is.

```
1. MAJOR version when you make incompatible API changes,
2. MINOR version when you add functionality in a backwards-compatible manner, and
3. PATCH version when you make backwards-compatible bug fixes. Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.
```

Now **pipeme.rb** is the file where we will put the code for our gem. Lucky for us, someone put
an space indicating where to put our code.

{% highlight ruby %}
require "pipeme/version"

module Pipeme
  # Your code goes here...
end
{% endhighlight %}

Probably your gems will be bigger than that and should result in more tha one file. The point here
is that this file will be the first loaded when your installed gem be required.

Like all good rubyist, we should write some tests to your gem. But at first I will
need to declare that my project have a test library. If we see the Gemfile, it
only have a call to gemspec.

{% highlight ruby %}
source 'https://rubygems.org'

# Specify your gem's dependencies in pipeme.gemspec
gemspec
{% endhighlight %}

Declare your dependencies in gemspec and only make reference to them divide opinions but
for this small project is more practical and easy way to do.

In pipeme.gemspec, after choose my test library (RSpec) I should declare it there.

{% highlight ruby %}
spec.add_development_dependency "rspec", "~> 3.0"
{% endhighlight %}

The pipeme.gemspec file will be now like this.

{% highlight ruby %}
# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'pipeme/version'

Gem::Specification.new do |spec|
  spec.name          = "pipeme"
  spec.version       = Pipeme::VERSION
  spec.authors       = ["Alex Rocha"]
  spec.email         = ["alex.rochas@yahoo.com.br"]

  spec.summary       = "Add a more functional approach to your Ruby projects"
  spec.description   = "Add pipe functionality as '>>' to Object class"
  spec.homepage      = "https://github.com/alexrochas/pipeme"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.12"
  spec.add_development_dependency "rake", "~> 10.0"
  spec.add_development_dependency "rspec", "~> 3.0"
end
{% endhighlight %}

Because we are working with RSpec, create the directory where our unit tests will be.

```
spec
├─ pipeme_spec.rb
└─ spec_pipeme.rb
```

In spec_pipeme.rb we should load all source files from "/lib" and import pipeme.

{% highlight ruby %}
$LOAD_PATH.unshift File.expand_path('../../lib', __FILE__)
require 'pipeme'
{% endhighlight %}

Writing our tests, seeing that is a pretty simple gem, for now will test
that the behavior we want is possible and if exists a file that contains
our gem version.

{% highlight ruby %}
require 'spec_helper'

describe Pipeme do
  it 'has a version number' do
    expect(Pipeme::VERSION).not_to be nil
  end

  it 'let me pipe procedures as expected' do
    expect('Alex' >> (-> (name) {"Hello #{name}!"})).equal? 'Hello Alex!'
  end
end
{% endhighlight %}

Having tests, we could go back to pipeme.rb.
For **pipeme.rb** I delete the content and added the following behavior.

{% highlight ruby %}
require "pipeme/version"

class Object
  def >>(proc)
    proc.(self)
  end
end
{% endhighlight %}

The source code for **pipeme** is simple and just one file should be enough.
Also, is not the scope of this post explain what is happening on this code. Maybe in another post.
Now from our root directory, we could run our tests with RSpec.

```shell
$ rspec

Pipeme
  has a version number
  let me pipe procedures as expected

Finished in 0.00155 seconds (files took 0.1186 seconds to load)
2 examples, 0 failures
```

Done. With passing tests we have a gem ready to be delivered.

![cover]({{ site.url }}/assets/media/rubygems-banner.jpg)
{:style="text-align: center"}

### Shipping your gem ###

Rubygems is essentially a repository for gems, like maven or npm. You should
have a account in rubygem before been able to push your gem [https://rubygems.org/sign_in](https://rubygems.org/sign_in).

Now, having a account, is time to export our gem for the world.

```shell
$ bundle exec rake release
```

This way, **pipeme** gem is available to be downloaded in any ruby ecosystem that use rubygems, from [https://rubygems.org/gems/pipeme](https://rubygems.org/gems/pipeme)
or declaring it in your Gemfile.

### Where to go from here? ###

Much more can be learned about gems. A good start may be read about other package managers as pypi, maven or npm.

Once you understand a little more about the process, give it a try in how to add executable scripts
to your gem and create rich terminal applications.

[http://guides.rubygems.org/specification-reference/#executables](http://guides.rubygems.org/specification-reference/#executables)

Study about continuous integration and how your gem can play with that.

[https://docs.travis-ci.com/user/languages/ruby](https://docs.travis-ci.com/user/languages/ruby)

Sometimes your gem require a server to run, read about how heroku can help you that task.

[https://devcenter.heroku.com/articles/getting-started-with-ruby#introduction](https://devcenter.heroku.com/articles/getting-started-with-ruby#introduction)

Thanks for reading!

Did a gem? Published on github? Tell me more in comments.
