---
layout: post
title: "Migrating from Ruby 2.7 to Ruby 3.x: New Features and Enhancements"
date: 2024-07-05
categories: ruby migration
excerpt: "Explore the new features and enhancements in Ruby 3.x that make it a powerful upgrade from Ruby 2.7. Learn about improved performance, new syntax, enhanced concurrency, and more."
---

Migrating from Ruby 2.7 to Ruby 3.x introduces several new features and improvements that enhance performance, usability, and functionality. This guide highlights the key features you can now utilize in Ruby 3.x that were not available or significantly improved from Ruby 2.7.

## Improved Performance

Ruby 3.x includes significant performance improvements, partly due to MJIT (Method-based Just-in-Time Compilation). This can lead to faster execution times for your applications. The goal of Ruby 3 is to be three times faster than Ruby 2.0, focusing on real-world performance improvements.

## Ractor (Actor-model Based Parallel Execution)

Ractor allows for parallel execution without the need for thread-safe code, enabling concurrency without threading issues.
```ruby
ractor = Ractor.new do
  "Hello from Ractor"
end
ractor.take # => "Hello from Ractor"
```

## Fiber Scheduler

Enhancements to Fibers and the introduction of a new scheduler interface allow for lightweight concurrency, suitable for I/O-bound operations like HTTP requests and database queries.
```ruby
require 'async'

Async do |task|
  task.sleep 1
  puts "Hello, async world!"
end
```

## Rightward Assignment

Rightward assignment is a new syntax feature that can be useful in pattern matching and conditional assignments.
```ruby
42 => x
puts x # => 42
```

## Pattern Matching Improvements

Ruby 3.x enhances the pattern matching introduced in Ruby 2.7 with more flexible and powerful options.
```ruby
case [0, 1, 2]
in [a, 1, b]
  puts "Matched with a=#{a} and b=#{b}"
else
  puts "No match"
end
```

## New Syntax for Keyword Arguments

Ruby 3.x introduces a clear distinction between positional and keyword arguments, eliminating the ambiguity present in Ruby 2.7.
```ruby
def foo(a, b: 0)
  a + b
end
foo(1, b: 2) # => 3
```

## Hash#except

The `Hash#except` method allows for easier manipulation of hashes by excluding specified keys.
```ruby
hash = { a: 1, b: 2, c: 3 }
hash.except(:b) # => { a: 1, c: 3 }
```

## Enhanced Enumerator::Lazy

Enhancements to `Enumerator::Lazy` improve performance and usability for handling large data sets lazily.
```ruby
lazy_enum = (1..Float::INFINITY).lazy.select { |x| x % 3 == 0 }.first(10)
```

## One-line Pattern Matching

You can now use pattern matching directly in assignment, making code more concise.
```ruby
{a: 1, b: 2} => {a:, b:}
puts a # => 1
puts b # => 2
```

## Find Pattern in Enumerable

New methods like `Enumerable#tally` provide more tools for working with collections.
```ruby
['a', 'b', 'a'].tally # => {"a"=>2, "b"=>1}
```

## New String Methods

Ruby 3.x adds methods like `String#delete_prefix` and `String#delete_suffix` for better string manipulation.
```ruby
"HelloWorld".delete_prefix("Hello") # => "World"
"HelloWorld".delete_suffix("World") # => "Hello"
```

## Safe Navigation Operator with Assignment

The safe navigation operator (`&.`) now works with assignments.
```ruby
hash = { foo: { bar: nil } }
hash[:foo]&.[](:bar) = "baz"
puts hash[:foo][:bar] # => "baz"
```

## Beginless Ranges

Beginless ranges allow for more flexible range operations.
```ruby
arr = [1, 2, 3, 4, 5]
arr[..3] # => [1, 2, 3, 4]
```

## New Built-in Methods

Array#intersection helps find common elements in arrays.
```ruby
[1, 2, 3] & [2, 3, 4] # => [2, 3]
```

## Improved Error Messages

Ruby 3.x provides more informative and readable error messages, making debugging easier.

By leveraging these new features and improvements, you can write more efficient, readable, and maintainable code in Ruby 3.x. Happy coding!