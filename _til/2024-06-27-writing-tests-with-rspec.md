---
layout: post
title: "How to Write DRY and Maintainable Tests with RSpec"
date: 2024-06-27
categories: [RSpec, Testing, Ruby]
excerpt: "Learn how to write clean and maintainable tests in RSpec by using shared examples, `it_behaves_like`, `subject`, and `before` hooks. This guide provides practical examples and best practices to help you keep your test suite DRY and effective."
tags: [Ruby]
---

## Today I Learned: How to Write DRY and Maintainable Tests with RSpec

When writing tests in RSpec, it’s crucial to keep your test suite DRY (Don't Repeat Yourself) and maintainable. RSpec provides several powerful features to help achieve this, including shared examples, `it_behaves_like`, `subject`, and `before` hooks. In this post, we'll explore how to use these features to write clean and effective tests.

### Shared Examples in RSpec

Shared examples in RSpec allow you to encapsulate common test logic that can be reused across different contexts. This reduces duplication and makes your test suite easier to maintain.

#### Defining Shared Examples

Let's start by defining shared examples. Suppose we have an `Order` model that we want to test for various states such as `completed`, `pending`, and `canceled`.

```ruby
# spec/support/shared_examples/order_status_examples.rb

RSpec.shared_examples 'order status' do |status, expected_message|
  let(:order) { Order.new(status: status) }

  subject { order.status_message }

  it "returns the correct status message" do
    expect(subject).to eq(expected_message)
  end
end
```

In this shared example:
- `status` and `expected_message` are parameters.
- We create an order with the given status.
- The `subject` block defines what we are testing, which is the `status_message` method of the order.
- The `it` block asserts that the status message is as expected.

### Using `it_behaves_like` to Include Shared Examples

Next, we include these shared examples in our tests using `it_behaves_like`.

```ruby
# spec/models/order_spec.rb
require 'rails_helper'
require 'support/shared_examples/order_status_examples'

RSpec.describe Order do
  context 'when the order is completed' do
    it_behaves_like 'order status', 'completed', 'Your order is completed.'
  end

  context 'when the order is pending' do
    it_behaves_like 'order status', 'pending', 'Your order is pending.'
  end

  context 'when the order is canceled' do
    it_behaves_like 'order status', 'canceled', 'Your order has been canceled.'
  end
end
```

### Using `subject` and `before` Hooks

The `subject` and `before` hooks help in setting up your tests cleanly and consistently.

- **`subject`**: Defines the main object under test.
- **`before`**: Contains setup code that runs before each example.

### Example

Here’s a simplified example to demonstrate the usage of `subject` and `before`.

```ruby
RSpec.describe User do
  subject { described_class.new(name: 'Jane Doe', age: 30) }

  before do
    subject.save
  end

  it 'is saved successfully' do
    expect(subject).to be_persisted
  end

  it 'has the correct name' do
    expect(subject.name).to eq('Jane Doe')
  end

  it 'has the correct age' do
    expect(subject.age).to eq(30)
  end
end
```

### Advanced Example with Multiple States

To show how these features can work together in a more complex scenario, let’s consider a `Project` model with various states and properties.

#### Defining Shared Examples

```ruby
# spec/support/shared_examples/project_status_examples.rb

RSpec.shared_examples 'project status' do |status, is_active, is_completed|
  let(:project) { Project.new(status: status) }

  subject { project }

  before do
    subject.save
  end

  it "is active: #{is_active}" do
    expect(subject.active?).to eq(is_active)
  end

  it "is completed: #{is_completed}" do
    expect(subject.completed?).to eq(is_completed)
  end
end
```

#### Using Shared Examples in Tests

```ruby
# spec/models/project_spec.rb
require 'rails_helper'
require 'support/shared_examples/project_status_examples'

RSpec.describe Project do
  context 'when the project is active' do
    it_behaves_like 'project status', 'active', true, false
  end

  context 'when the project is completed' do
    it_behaves_like 'project status', 'completed', false, true
  end

  context 'when the project is inactive' do
    it_behaves_like 'project status', 'inactive', false, false
  end
end
```

### Conclusion

By using shared examples, `it_behaves_like`, `subject`, and `before` hooks, you can write DRY and maintainable tests with RSpec. These tools help you encapsulate common logic, reduce duplication, and set up your tests cleanly.

Happy testing!