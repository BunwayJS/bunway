# Bunway Architecture

## High-Level Overview

```
┌─────────────────────────────────────────────┐
│         Incoming HTTP Request               │
└────────────────────┬────────────────────────┘
                     │
                     ▼
        ┌────────────────────────┐
        │  Config Loader         │
        │  (Zod validation)      │
        └────────────────────────┘
                     │
                     ▼
        ┌────────────────────────┐
        │  Route Loader          │
        │  (Startup only)        │
        └────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────┐
│         HTTP Server (Bun. serve)          │
└──────────────────────────────┬───────────┘
                               │
                               ▼
        ┌─────────────────────────────┐
        │  Request Handler            │
        │  1. Parse query/body        │
        │  2. Find matching route     │
        │  3. Create context          │
        └────────────┬────────────────┘
                     │
                     ▼
        ┌──────────────────────────┐
        │  Middleware Pipeline     │
        │  (Sequential execution)  │
        └────────────┬─────────────┘
                     │
                     ▼
        ┌──────────────────────────┐
        │  Route Handler           │
        │  (Resolved controller)   │
        └────────────┬─────────────┘
                     │
                     ▼
        ┌──────────────────────────┐
        │  Response Helper         │
        │  (json/html/text)        │
        └────────────┬─────────────┘
                     │
                     ▼
┌──────────────────────────────────────────┐
│         HTTP Response                    │
└──────────────────────────────────────────┘
```

---

## Core Components

### 1. Configuration System

**Files:**
- `ConfigSchema.ts` — Zod schema definition
- `ConfigLoader.ts` — File loading & validation

**Responsibilities:**
- Load `bunway.config.ts`
- Validate against schema
- Freeze at runtime (immutable)
- Provide type inference

**Key Property:**
- Configuration is validated once at startup
- No runtime mutations allowed
- Type-safe and predictable

### 2. Route Loader

**File:** `RouteLoader.ts`

**Responsibilities:**
- Load route file at startup
- No auto-discovery
- No runtime registration
- Single explicit entry point

**Path Resolution:**
- Route path comes from config
- Core doesn't assume paths
- Presets define convention

### 3. HTTP Server

**File:** `Server.ts`

**Built on:** `Bun.serve`

**Responsibilities:**
- Listen on configured port/host
- Accept incoming requests
- Delegate to RequestHandler
- Centralized error catching

### 4. Request Handler

**File:** `RequestHandler.ts`

**Pipeline:**
1. Parse URL, method, query
2. Parse request body (if applicable)
3. Find matching route
4. Create context object
5. Execute middleware pipeline
6. Call route handler
7. Return response

**Path-Agnostic:**
- Doesn't assume controller location
- Uses ControllerResolver for resolution

### 5. Router

**File:** `Router.ts`

**Responsibilities:**
- Register routes (HTTP verbs)
- Manage route groups
- Match incoming requests to routes
- Support parameterized routes

**HTTP Methods:**
```typescript
app.get(path, handler, middleware?)
app.post(path, handler, middleware?)
app.put(path, handler, middleware?)
app.delete(path, handler, middleware?)
app.patch(path, handler, middleware?)
app.options(path, handler, middleware?)
app.head(path, handler, middleware?)
```

**Route Grouping:**
```typescript
app.group(prefix, callback, middleware?)
```

**Path Matching:**
- Exact:  `/users`
- Parameters: `/users/:id`
- Groups: `/admin/users`

### 6. Controller Resolver

**File:** `ControllerResolver.ts`

**Supports Three Syntaxes:**

1. **Inline Handler**
```typescript
app.get('/', (ctx) => ctx.json({}))
```

2. **String-Based**
```typescript
app.get('/', 'UserController@index')
```

3. **Direct Reference**
```typescript
app.get('/', UserController, 'index')
```

**Resolution Process:**
1. Receive handler in one of three formats
2. Normalize to executable function
3. Return `(ctx: BunwayContext) => Promise<Response>`

### 7. Middleware Pipeline

**File:** `MiddlewarePipeline.ts`

**Features:**
- Sequential execution
- Can modify context (ctx. user, etc.)
- Can short-circuit requests
- Separate from error handling

**Signature:**
```typescript
type Middleware = (ctx: BunwayContext, next: () => Promise<Response>) => Promise<Response>
```

**Execution Order:**
1. Global middleware
2. Group middleware
3. Route middleware
4. Handler execution
5. Response

### 8. Context Object

**File:** `types/context.ts`

**Properties:**
- `req` — Original request
- `params` — Route parameters
- `query` — Query parameters
- `body` — Parsed request body
- `state` — Extensible state object

**Methods:**
- `json(data, status?)` — JSON response
- `text(text, status?)` — Text response
- `html(html, status?)` — HTML response
- `redirect(url, status?)` — Redirect response

**Extensible:**
- Via TypeScript declaration merging
- Middleware can add properties
- Type-safe with proper declarations

### 9. Error Handler

**File:** `ErrorHandler.ts`

**Separate Pipeline:**
- Not part of middleware chain
- Catches all unhandled errors
- Centralized error responses

**Handles:**
- 404 Not Found
- 500 Internal Server Error
- Custom BunwayError

**Environment-Aware:**
- Development: Full stack traces
- Production: Safe error messages

---

## Data Flow

### Request Lifecycle

```
1. HTTP Request arrives
   │
2. Config loaded & validated (once at startup)
   │
3. Routes loaded (once at startup)
   │
4. Bun.serve receives request
   │
5. RequestHandler extracts metadata: 
   ├─ URL & path
   ├─ HTTP method
   ├─ Query parameters
   └─ Request body
   │
6. Router finds matching route
   │
7. Context object created: 
   ├─ Request info
   ├─ Route params
   ├─ Query params
   ├─ Body
   ├─ State object
   └─ Response helpers
   │
8. Middleware pipeline executes in sequence
   │
9. Route handler executes: 
   ├─ Resolve controller
   ├─ Call method with context
   └─ Return response
   │
10. Response sent to client
```

### Startup Sequence

```
1. Import bunway. config.ts
   │
2. ConfigLoader validates with Zod
   │
3.  Freeze config (immutable)
   │
4. RouteLoader imports route file
   │
5. Routes register themselves
   │
6. Server instantiated
   │
7. Bun.serve started
   │
8. Listen on port: host
   │
9. App ready for requests
```

---

## Preset System

### What Presets Define

```typescript
const preset = {
  structure: 'node',  // Preset identifier
  paths: {
    routes: 'src/routes/web.ts',
    controllers: 'src/controllers',
    middleware: 'src/middleware',
    services: 'src/services',
  },
};
```

### Preset Resolution

1. **v0. 1:** `node` only
2. **v0.2:** `node`, `mvc`, `webbyphp`
3. **v0.3+:** Community presets possible

### Preset Isolation

- Presets do NOT fork core logic
- Presets only define paths
- Core remains path-agnostic
- No preset dependencies in core

---

## Modularity

### Package Structure

```
@bunway/core              ← Runtime
  ├─ Router
  ├─ Middleware
  ├─ Server
  └─ Error handling

@bunway/cli               ← Scaffolding
  ├─ create command
  ├─ generators
  └─ templates

@bunway/preset-node       ← Node structure
  └─ path definitions

@bunway/preset-mvc        ← MVC structure (v0.2)
@bunway/preset-webbyphp   ← WebbyPHP structure (v0.2)
```

### Independence

- Core works standalone
- CLI depends on core + presets
- Presets depend only on types
- No circular dependencies

---

## Type Safety

### TypeScript Configuration

```json
{
  "strict": true,
  "noImplicitAny": true,
  "strictNullChecks":  true,
  "strictFunctionTypes": true
}
```

### Declaration Merging

Middleware and plugins can extend context:

```typescript
declare module '@bunway/core' {
  interface BunwayContext {
    user?:  AuthUser;
    db?: Database;
  }
}
```

### Inference

Config schema provides full type inference:

```typescript
const config = defineConfig({ ...  });
// config is typed as BunwayConfig automatically
```

---

## Performance Considerations

### Startup

- Routes registered once
- Config validated once
- No hot-reload (v0.1)

### Runtime

- Handler caching possible (future)
- Middleware composition optimized
- Context object lightweight
- No reflection or introspection

### Memory

- Single router instance
- Middleware pipeline composed once
- Context GC'd after response
- No global state pollution

---

## Security

### Config Validation

- Zod enforces schema
- Runtime mutations prevented
- Type validation

### Request Handling

- Body parsing limits (future)
- CSRF protection (plugin)
- Auth helpers (v0.4)

### Error Handling

- Stack traces only in dev
- No sensitive data exposed in prod
- Centralized error responses