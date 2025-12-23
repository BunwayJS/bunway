# Bunway Philosophy

## What is Bunway?

Bunway is a **Bun-native backend framework** with preset-driven architecture. 

It is **NOT**:
- ❌ A Laravel clone
- ❌ A Node.js framework wrapper
- ❌ A JavaScript translation of CodeIgniter

It is: 
- ✅ A first-class Bun framework
- ✅ Respectful of developer choice
- ✅ Explicit over implicit
- ✅ Predictable and clear

---

## Core Principles

### 1. Presets Define Structure, Not Behavior

Your folder structure is a choice, not a requirement. 

Presets provide **conventional** structures:
- `node` — Flat, flexible, API-focused
- `mvc` — Traditional separation of concerns
- `webbyphp` — Familiar to PHP developers

The **core runtime** doesn't care how you organize files.

### 2. Explicit Configuration

Configuration is code, not magic.

`bunway.config.ts` is: 
- Required
- Validated with Zod
- Immutable at runtime
- Locked schema (no mutations)

You control your app's behavior explicitly.

### 3. Path-Agnostic Core

The framework kernel understands: 
- Routes
- Handlers
- Middleware
- Context & responses

It does **NOT** understand:
- Folder names
- File locations
- MVC assumptions

All path resolution is delegated to presets and loaders.

### 4. Low Magic, High Control

Bunway respects your mental model. 

- No hidden middleware chains
- No automatic model loading
- No service container surprises
- No convention enforcement (presets suggest, core doesn't assume)

You decide how your app works.

### 5. Predictable Developer Experience

Every concept in Bunway is: 
- Learnable in < 1 hour
- Consistent across features
- Well-documented
- Simple to debug

There should be no surprises.

---

## Design Decisions

### Why Presets?

Presets allow flexibility without complexity.

They define **structure**:
- Folder layout
- Entry points
- Route locations
- Path conventions

They don't define **behavior**:
- How routing works
- How middleware executes
- How responses are sent

This separation lets you choose your convention while the core stays focused.

### Why Immutable Config? 

A frozen configuration prevents runtime mutations that lead to debugging nightmares.

Your config is defined once at startup, validated, and locked.

This guarantees:
- Predictable behavior
- No implicit changes
- Clear dependency injection (config is explicit)

### Why Separate Error Handling? 

Errors should not flow through the middleware pipeline. 

Middleware shouldn't need try/catch. 

Error handling is a **separate concern** with its own pipeline.

This keeps middleware focused and errors deterministic.

### Why All Three Controller Syntaxes?

Different syntaxes for different use cases: 

1. **Inline** — Fast for small apps, no abstraction
2. **String-based** — Familiar to Laravel/WebbyPHP developers
3. **Direct reference** — TypeScript-friendly

Supporting all three normalizes internally into a single handler.

No performance cost, maximum flexibility.

### Why TypeScript Declaration Merging for ctx?

Context objects need to be extended by middleware and plugins.

Declaration merging allows:
- Type-safe extensions
- No generics explosion
- Ecosystem compatibility
- Clean developer experience

```typescript
declare module '@bunway/core' {
  interface BunwayContext {
    user?:  User;
  }
}
```

---

## What Bunway is NOT

### Not a Laravel Clone

While inspired by Laravel's DX, Bunway: 
- Doesn't copy Laravel's service container
- Doesn't use facades or static helpers
- Isn't trying to be a universal framework

Bunway is specifically optimized for **Bun**. 

### Not a Node Framework Wrapper

Bunway doesn't wrap Express, Fastify, or Hono.

It's built directly on **Bun. serve**.

The core is **first-class Bun code**, not a translation layer.

### Not Opinionated About Everything

Bunway is opinionated about:
- Configuration (must be explicit)
- Path-agnosticism (core doesn't hardcode paths)
- Error handling (separate pipeline)
- Middleware (sequential, deterministic)

Bunway is **flexible** about: 
- Project structure (presets choose)
- Naming conventions (use yours)
- Response formats (json, html, text, redirect...)
- Validation strategies (plugins can provide)

---

## Guiding Principle

> Bunway is a framework that respects the developer's mental model,
> not one that forces a single way of thinking.

---

## Inspiration

Bunway draws ideas from: 

- **Laravel** — Developer experience, structure clarity
- **CodeIgniter / WebbyPHP** — Simplicity, explicitness, MVC discipline
- **Express/Fastify** — Simplicity, middleware focus
- **Hono** — Bun optimization, lightweight approach

But Bunway is **none of these**. 

It's a **new framework for a new runtime**.

---

## The Bunway Manifesto

- **Explicit** over implicit
- **Predictable** over surprising
- **Clear** over clever
- **Flexible** over rigid
- **Simple** over complex
- **Focused** over everything-in-one-box

When in doubt, choose clarity. 