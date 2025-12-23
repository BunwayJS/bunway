# @bunway/core

The core runtime kernel for Bunway framework.

## Features

API
Router
TypeScript

app.get(path, handler, middleware?)
app.post(path, handler, middleware?)
app.put(path, handler, middleware?)
app.delete(path, handler, middleware?)
app.patch(path, handler, middleware?)
app.options(path, handler, middleware?)
app.head(path, handler, middleware?)

app.group(prefix, callback, middleware?)

Context (ctx)
TypeScript

// Response helpers
ctx.json(data, status?)
ctx.text(text, status?)
ctx.html(html, status?)
ctx.redirect(url, status?)

// Request data
ctx.params      // Route parameters
ctx.query       // Query parameters
ctx.body        // Request body (if parsed)
ctx.req         // Original request
ctx.state       // Extensible state object

Middleware
TypeScript

const auth = async (ctx, next) => {
  if (!ctx.req.headers.get('authorization')) {
    return ctx.json({ error: 'Unauthorized' }, 401);
  }
  return next();
};

app.get('/protected', handler).middleware(auth);

License

MIT

import type { Router } from '../router/Router';

/**
 * Loads routes from explicit route file
 * No auto-discovery
 * Startup only (no runtime registration)
 */
export class RouteLoader {
  /**
   * Load routes from file
   */
  static async load(routeFilePath: string, router: Router): Promise<void> {
    try {
      await import(routeFilePath);
      console.log(`Routes loaded from ${routeFilePath}`);
    } catch (error) {
      throw new Error(`Failed to load routes from ${routeFilePath}: ${error}`);
    }
  }
}