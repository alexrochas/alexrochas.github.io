---
title: "Run RSpec Tests for Changed Files in Git"
date: 2025-01-16
subject: "RSpec, Git, Automation"
tags: [ruby, rspec, git, testing, automation]
---

When working with Ruby and RSpec, I wanted to streamline the process of running tests only for files affected by recent changes in Git. Here's how I achieved it by creating a script that maps modified files to their corresponding RSpec test files.

### **The Challenge**
The goal was to:
1. Identify files changed using `git status`.
2. Map each changed Ruby file to its corresponding test file (`_spec.rb`).
3. Skip irrelevant files like `.csv` or other non-Ruby files.
4. Automatically run the identified tests.

### **The Solution**
I created a Ruby script (`run_changed_specs.rb`) that dynamically determines the current working directory, filters changed files, and runs only the relevant specs.

Here's the script:

```ruby
#!/usr/bin/env ruby

# Get the current working directory
current_dir = Dir.pwd

# Get the changed files from `git status`
changed_files = `git -C #{current_dir} status --porcelain`.lines.map { |line| line.strip.split.last }

# Helper function to map a source file to its corresponding spec file
def find_spec_file(file, current_dir)
  return file if file.include?("spec") # It's already a spec file

  # Only consider Ruby source files
  return nil unless file.end_with?(".rb")

  # Replace "app/" or other source directory prefixes with "spec/"
  spec_file = file.sub("app/", "spec/")
                  .sub(/\.rb$/, "_spec.rb") # Append `_spec.rb` to match the spec naming convention

  # Ensure the spec file exists relative to the current directory
  full_spec_path = File.join(current_dir, spec_file)
  File.exist?(full_spec_path) ? spec_file : nil
end

# Map changed files to their spec files, filtering out non-Ruby files
spec_files = changed_files.map { |file| find_spec_file(file, current_dir) }.compact

if spec_files.empty?
  puts "No matching spec files found for the changed files."
  exit 1
end

# Print the spec files to be run
puts "Running specs for the following files:"
spec_files.each { |file| puts "- #{file}" }

# Run the specs from the current directory
system("cd #{current_dir} && rspec #{spec_files.join(' ')}")
```

### **How It Works**
1. **Get Changed Files:**  
   Uses `git status --porcelain` to get a list of modified files.

2. **Filter Relevant Files:**
    - If the file contains `spec`, it is treated as a test file.
    - Ruby files (`.rb`) are mapped to their corresponding `_spec.rb` files.
    - Non-Ruby files are ignored.

3. **Run the Tests:**  
   All identified spec files are passed to `rspec`.

### **Usage**
1. Save the script as `run_changed_specs.rb` in your project directory.
2. Make it executable:
   ```bash
   chmod +x run_changed_specs.rb
   ```
3. Run the script from any directory in the project:
   ```bash
   ./run_changed_specs.rb
   ```

### **Example Workflow**
Given this output from `git status`:
```
modified:   app/models/item.rb
modified:   spec/app/decorators/style_spec.rb
modified:   data/templates/export_template.csv
```

The script will correctly identify:
```
Running specs for the following files:
- spec/models/item_spec.rb
- spec/app/decorators/style_spec.rb
```

And run:
```bash
rspec spec/models/item_spec.rb spec/app/decorators/style_spec.rb
```

### **Takeaways**
- Automating testing for changed files can significantly speed up development and testing cycles.
- Mapping source files to their test files ensures that only relevant tests are run.
- Scripts like this can be easily customized to fit specific project structures.

---

**That's it! Now you can run tests efficiently based on changed files. 🚀**