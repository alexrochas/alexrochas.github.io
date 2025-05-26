---
title: "TIL: One Alias to Rule All Package Managers"
date: 2025-05-26
excerpt: "Tired of remembering whether a project uses pnpm, yarn, or npm? Use this `pm` alias to run commands without thinking twice."
layout: post
tags: [til, shell, node, productivity, aliases]
---

Today I learned how to create a smart `pm` alias that automatically picks the correct package manager based on the lockfile in the project. Super handy when jumping between `pnpm`, `yarn`, and `npm` projects all day.

### 🧠 The Alias

```bash
pm() {
  if [ -f pnpm-lock.yaml ]; then
    cmd="pnpm"
  elif [ -f yarn.lock ]; then
    cmd="yarn"
  elif [ -f package-lock.json ]; then
    cmd="npm"
  else
    echo "No lockfile found – falling back to yarn"
    cmd="yarn"
  fi

  echo "Using $cmd"
  $cmd "$@"
}
```
