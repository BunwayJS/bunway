### 6. Documentation Files

````markdown name=docs/ROADMAP.md url=https://github.com/bunwayjs/bunway/blob/main/docs/ROADMAP.md
# Bunway Roadmap

## Phase 0 — Foundation & Direction ✅

**Completed:**
- Framework philosophy defined
- Architectural boundaries locked
- Preset system established
- Config schema finalized

---

## Phase 1 — v0.1 (Core Stabilization) 🚀 CURRENT

### Objectives

✅ Bun-native HTTP server (Bun. serve)
✅ Router with grouping & middleware
✅ Middleware pipeline
✅ Controller resolution (all three syntaxes)
✅ Config loading & validation (Zod)
✅ Error handling (404/500)
✅ Response helpers
✅ CLI scaffolding
✅ Node preset only
✅ Sample validation app

### What's Included

- `@bunway/core` — Complete runtime
- `@bunway/cli` — Project scaffolding
- `@bunway/preset-node` — Node preset
- `samples/basic-app` — Reference app
- Documentation & guides

### What's NOT Included

- ❌ MVC preset (v0.2)
- ❌ WebbyPHP preset (v0.2)
- ❌ Hot reloading (v0.3)
- ❌ Plugin system (v0.4)
- ❌ Any breaking changes allowed

---

## Phase 2 — v0.2 (Preset Expansion)

**Timeline:** Q1 2025

### New Presets

- **mvc** — Traditional MVC (Controllers, Models, Views)
- **webbyphp** — WebbyPHP / CodeIgniter-inspired

### CLI Enhancements

- Preset selection during scaffolding
- Preset-specific templates
- Better folder generation

### Core Changes

- None — Core remains stable

### Documentation

- MVC preset guide
- WebbyPHP preset guide
- Migration guides

---

## Phase 3 — v0.3 (Developer Experience)

**Timeline:** Q2 2025

### Features

- Hot module reloading (dev mode)
- Improved error messages & stack traces
- Route introspection & debugging
- Dev-friendly middleware
- Config diagnostics

### Documentation

- Dev workflow guide
- Debugging guide

### Breaking Changes

- None

---

## Phase 4 — v0.4 (Extensibility)

**Timeline:** Q3 2025

### Features

- Plugin system with lifecycle hooks
- Middleware packs
- Preset plugins
- Extension points

### Constraints

- Plugins cannot mutate core
- Version compatibility enforced
- Plugin registry (future)

### Breaking Changes

- None

---

## Phase 5 — v0.5 (Production Readiness)

**Timeline:** Q4 2025

### Features

- Performance optimization
- Memory profiling & tuning
- Load testing validation
- Security hardening
- Graceful shutdown
- Request timeouts
- Structured logging

### Breaking Changes

- None

---

## v1.0 (Framework Maturity)

**Timeline:** Q1 2026

### Criteria

✅ Stable core API
✅ Preset ecosystem proven
✅ Documentation complete
✅ Community feedback integrated

### v1.0 Guarantees

- Semantic versioning enforced
- Backward compatibility maintained
- Long-term support mindset

---

## Future Considerations (Post v1.0)

- HTTP/2 & HTTP/3 support
- WebSocket support
- OpenAPI generation
- Validation layer
- Auth helpers
- SSR helpers
- Microservice tooling
- Database integrations
- ORM support

These are **not commitments** but explorations. 

---

## Philosophy

Bunway grows by clarity, not ambition. 

Each phase must feel inevitable, not rushed.

No feature creep within a version.

Stability > velocity. 