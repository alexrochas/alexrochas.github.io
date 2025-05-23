---
title: "Reactive Singleton Composables in Vue: How and Why"
date: 2025-05-23
author: "Alex Rocha"
excerpt: "A common challenge in Vue apps is managing shared, reactive state across multiple components — especially when fetching data. In this post, you'll learn how to create a singleton composable that loads data only once, remains reactive, and exposes a method for refetching on demand. We’ll also compare it to `provide/inject` and cover best practices to prevent multiple concurrent fetches."
layout: post
tags: [vue, composition-api, singleton, reactivity, provide-inject]
---

When working with Vue's Composition API, sometimes you need a **single source of truth** — like shared config, cached data, or a global flag. In these cases, you might reach for `provide/inject`… but there’s another elegant option: **singleton composables**.

This post covers:
- How to build a **reactive singleton composable**
- How to expose a **reload method**
- A comparison with `provide/inject`

---

## 🔁 What’s a Singleton Composable?

A **singleton composable** is just a regular function that returns a **shared reactive state**, ensuring it's only initialized once — no matter how many components use it.

---

## 🛠 Example: Fetching Data Once and Reloading It

Here’s how you can create a reactive singleton composable with a `reload` method:

```ts
// composables/useSettings.ts
import { ref } from 'vue'

const settings = ref(null)
const loading = ref(false)
let loaded = false

async function fetchSettings() {
  loading.value = true
  // Simulate a fetch or call to API
  await new Promise(resolve => setTimeout(resolve, 1000))
  settings.value = {
    theme: 'dark',
    language: 'en',
  }
  loading.value = false
  loaded = true
}

export function useSettings() {
  if (!loaded) {
    fetchSettings()
  }

  return {
    settings,
    loading,
    reload: fetchSettings,
  }
}
```

### ✅ Usage in components

```vue
<script setup>
import { useSettings } from '@/composables/useSettings'

const { settings, loading, reload } = useSettings()
</script>

<template>
  <div v-if="loading">Loading...</div>
  <pre v-else>{ '{ settings }' }</pre>
  <button @click="reload">Reload</button>
</template>
```

✔️ The same `settings` and `loading` state is used **everywhere**.  
✔️ Calling `reload()` triggers a re-fetch **globally**.

---

## 🆚 Singleton vs `provide/inject`

Let’s break down when to use each:

| Feature                        | Singleton Composable                    | `provide/inject`                               |
|-------------------------------|-----------------------------------------|------------------------------------------------|
| 🔄 Reactive updates           | ✅ Shared across all usages             | ✅ Reactivity scoped to component tree         |
| 🧠 Simple to use              | ✅ Just import and call                 | ❌ Needs explicit `provide()` and `inject()`   |
| 📦 Lazy loading               | ✅ Easy to setup with flags             | ❌ Requires extra setup to defer logic         |
| 🧭 Scoped behavior            | ❌ Global only                          | ✅ Scoped per `provide` tree                   |
| 🧪 Test isolation             | ✅ Easy                                  | ✅ Good via injection mocking                 |

### 💡 Use Singleton When...
- You need global, reactive state (e.g., feature toggles, config)
- No need for context scoping
- You want simplicity

### 💡 Use `provide/inject` When...
- You need **contextual** or **scoped** dependencies
- You’re writing **reusable components** or plugins
- You want different instances for different trees

---

## 🧠 Bonus Tips

- Want both? Provide the singleton:
  ```ts
  app.provide('settings', useSettings())
  ```

- Need SSR? Guard global variables and use Pinia or Nuxt’s `useAsyncData` for hydration.

- Avoid duplicate fetches: If multiple components mount simultaneously, they could all trigger a fetch. Use a **shared promise** pattern to ensure only one request runs:

  ```ts
  const data = ref(null) // prevent reasignment
  let fetchPromise: Promise<any> | null = null

  function fetchData(force = false) {
    if (!force && data.value) return Promise.resolve(data.value)
    if (!force && fetchPromise) return fetchPromise 
  
    fetchPromise = fetchStuff().then(result => {
      data.value = result
      fetchPromise = null // important: allow future calls
      return result
    })
  
    return fetchPromise
  }

  export function useSingletonData() {
    fetchData()
    return { data, refetch: (force = true) => fetchData(force) }
  }
  ```

  🔐 This guards against racing conditions and ensures consistent data loading.

---

## 🚀 Conclusion

Singleton composables offer a simple, powerful way to **share reactive state** across components. They’re ideal for global data and can be extended with reloaders, setters, or caching logic.

Use `provide/inject` if your logic depends on **component context** or if you need **multiple isolated instances**.

Happy coding 🧑‍💻  
— Alex
