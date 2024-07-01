---
layout: post
title: "Mastering FactoryBot: Defining and Modifying Factories"
date: 2024-06-27
categories: [RSpec, FactoryBot, Testing, Ruby]
excerpt: "Learn how to define and modify factories with FactoryBot to create flexible and maintainable test data for your Ruby applications. This guide covers the basics and provides practical examples."
---

## How to Write DRY and Maintainable Tests with FactoryBot

FactoryBot is a powerful library for setting up Ruby objects as test data, previously known as FactoryGirl. It's widely used with RSpec to create maintainable and flexible test suites. This post covers how to define new factories and modify existing ones, especially those provided by third-party gems.

### Defining Factories with FactoryBot

Defining factories with FactoryBot allows you to specify default attributes for your test objects. This makes it easy to create instances with consistent data while also providing the flexibility to override attributes as needed.

Here's how you can define a simple factory for a `User` model:

```ruby
# spec/factories/users.rb
FactoryBot.define do
  factory :user do
    sequence(:name) { |n| "User #{n}" }
    email { Faker::Internet.email }
    password { "password123" }
    active { true }
  end
end
```

In this example:
- **sequence(:name)** ensures each user has a unique name.
- **email** uses the Faker gem to generate a random email address.
- **password** sets a default password.
- **active** sets a default boolean attribute.

You can then use this factory in your tests:

```ruby
# spec/models/user_spec.rb
require 'rails_helper'

RSpec.describe User, type: :model do
  it 'creates a valid user' do
    user = create(:user)
    expect(user).to be_valid
  end

  it 'creates an inactive user' do
    user = create(:user, active: false)
    expect(user.active).to be false
  end
end
```

### Using Traits Inside a Factory

Traits in FactoryBot allow you to define variations of a factory. Traits can specify additional attributes, override existing ones, or add associations. This makes it easier to create different types of objects with the same base factory.

Here's an example of a `User` factory with traits:

```ruby
# spec/factories/users.rb
FactoryBot.define do
  factory :user do
    sequence(:name) { |n| "User #{n}" }
    email { Faker::Internet.email }
    password { "password123" }
    active { true }

    trait :admin do
      role { 'admin' }
    end

    trait :guest do
      role { 'guest' }
      active { false }
    end
  end
end
```

In this example:
- **`trait :admin`**: Adds or overrides the `role` attribute to `'admin'`.
- **`trait :guest`**: Sets the `role` attribute to `'guest'` and the `active` attribute to `false`.

You can use these traits in your tests to create specific variations of a user:

```ruby
# spec/models/user_spec.rb
require 'rails_helper'

RSpec.describe User, type: :model do
  it 'creates an admin user' do
    admin_user = create(:user, :admin)
    expect(admin_user.role).to eq('admin')
  end

  it 'creates a guest user' do
    guest_user = create(:user, :guest)
    expect(guest_user.role).to eq('guest')
    expect(guest_user.active).to be false
  end
end
```

### Modifying Factories with FactoryBot

FactoryBot also allows you to modify existing factories. This is particularly useful when you want to customize factories provided by third-party gems without altering the original source code.

#### Example: Modifying an Existing Factory

Suppose you have a third-party gem that defines a `Product` factory. You can extend this factory with additional attributes and traits.

##### Original Factory (Defined in the Gem)

```ruby
# spree_core/lib/spree/testing_support/factories/product_factory.rb
FactoryBot.define do
  factory :product, class: Spree::Product do
    name { "Baseball Cap" }
    price { 19.99 }
    available_on { Time.current }
    shipping_category
  end
end
```

##### Your Custom Modifications

Create a new file in your application's `spec/factories` directory to modify the existing factory:

```ruby
# spec/factories/spree_product_modifications.rb
FactoryBot.modify do
  factory :product do
    sequence(:sku) { |n| "SKU#{n}" }
    color { 'Blue' }
    size { 'Medium' }

    trait :with_discount do
      discount_price { price * 0.8 }
    end

    trait :premium do
      premium { true }
      price { 29.99 }
    end

    after(:create) do |product|
      product.update!(available_on: Time.current)
    end
  end
end
```

##### Using the Modified Factory

Now you can use the modified factory in your tests:

```ruby
# spec/models/product_spec.rb
require 'rails_helper'

RSpec.describe Spree::Product, type: :model do
  it 'creates a product with a custom SKU' do
    product = create(:product)
    expect(product.sku).to match(/SKU\d+/)
  end

  it 'creates a product with a discount' do
    product = create(:product, :with_discount)
    expect(product.discount_price).to eq(product.price * 0.8)
  end

  it 'creates a premium product' do
    product = create(:product, :premium)
    expect(product.premium).to be true
    expect(product.price).to eq(29.99)
  end
end
```

### Conclusion

FactoryBot provides a powerful way to manage your test data by defining factories for your models and modifying existing ones. By leveraging these features, including the use of traits, you can keep your test suite DRY, maintainable, and flexible.

Happy testing!