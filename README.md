# Bunway

A Bun-native backend framework with preset-driven architecture. 

## Philosophy

Bunway is not a Laravel clone and not a Node framework wrapper. It is a **first-class Bun framework** that prioritizes:

- **Explicit configuration** — No magic, configuration is code
- **Predictable folder structures** — Presets define conventions
- **Preset-driven architecture** — Choose your structure
- **Low magic, high control** — You decide how your app works
- **Excellent developer experience** — Clear, fast, purposeful

## Core Concepts

### Presets

Presets define **structure**, not behavior. Choose how your project is organized:

- **node** (v0.1) — Flat, explicit, flexible
- **mvc** (v0.2) — Convention-first, Laravel/WebbyPHP-inspired
- **webbyphp** (v0.2) — Familiar to PHP developers
- **minimal** (future) — Absolute control, edge deployments

### Configuration

`bunway.config.ts` is: 
- Required
- Validated with Zod
- Immutable at runtime
- Frozen schema (no mutations)

### Core Runtime

The framework kernel is **path-agnostic**: 
- Routes
- Handlers
- Middleware
- Context & responses

All path resolution is delegated to presets and loaders.

## Quick Start

### Installation

```bash
# Create a new Bunway project
bunway create my-app

# Navigate to project
cd my-app

# Install dependencies
bun install

# Start development server
bun run dev