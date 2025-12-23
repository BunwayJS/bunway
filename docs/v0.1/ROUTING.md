# Routing Guide

Bunway uses a simple, expressive routing system inspired by Laravel and Express. 

## Basic Routes

```typescript
import { app } from '@bunway/core';

// GET request
app.get('/', (ctx) => ctx.html('<h1>Home</h1>'));

// POST request
app.post('/users', (ctx) => ctx.json({ created: true }));

// PUT request
app.put('/users/: id', (ctx) => ctx.json({ updated: true }));

// DELETE request
app.delete('/users/:id', (ctx) => ctx.json({ deleted: true }));

// PATCH request
app.patch('/users/:id', (ctx) => ctx.json({ patched: true }));

// OPTIONS request
app.options('/users', (ctx) => ctx.text('OK'));

// HEAD request
app.head('/users', (ctx) => ctx.text(''));
```

## URL Parameters

Use `:paramName` syntax:

```typescript
app.get('/users/:id', (ctx) => {
  const { id } = ctx.params;
  return ctx.json({ userId: id });
});

// Access: GET /users/123
// ctx.params = { id: '123' }
```

Multiple parameters:

```typescript
app.get('/posts/:postId/comments/:commentId', (ctx) => {
  const { postId, commentId } = ctx.params;
  return ctx. json({ postId, commentId });
});
```

## Query Parameters

Access via `ctx.query`:

```typescript
app.get('/search', (ctx) => {
  const { q, limit } = ctx.query;
  return ctx.json({ query: q, limit });
});
```

```bash
GET /search?q=bunway&limit=10
# ctx.query = { q: 'bunway', limit: '10' }
```

## Route Groups

Group related routes:

```typescript
app.group('/api', () => {
  app.get('/users', (ctx) => ctx.json([]));
  app.post('/users', (ctx) => ctx.json({ created: true }));
  app.get('/posts', (ctx) => ctx.json([]));
});

// Routes: 
// GET /api/users
// POST /api/users
// GET /api/posts
```

Nested groups:

```typescript
app.group('/admin', () => {
  app.group('/users', () => {
    app.get('/', (ctx) => ctx.json([]));
    app.post('/', (ctx) => ctx.json({ created: true }));
  });
});

// Routes:
// GET /admin/users/
// POST /admin/users/
```

## Middleware on Routes

```typescript
import { auth } from '@/middleware/auth';

app.get('/protected', (ctx) => {
  return ctx.json({ user: ctx.user });
}).middleware(auth);
```

Multiple middleware:

```typescript
app.get('/admin', handler).middleware([auth, admin]);
```

## Middleware on Groups

```typescript
app.group('/admin', () => {
  app.get('/users', UserController, 'index');
  app.post('/users', UserController, 'store');
}, [auth, admin]);

// All routes in this group require auth and admin middleware
```

## Controller Handlers

Three syntax options:

### 1. Inline Handler

```typescript
app.get('/', (ctx) => ctx.json({ hello