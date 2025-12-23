import { app } from '@bunway/core';
import { HomeController } from '@/controllers/HomeController';
import { UserController } from '@/controllers/UserController';
import { auth } from '@/middleware/auth';

/**
 * Inline handler
 */
app.get('/', (ctx) => {
    return ctx.html(`
    <html>
      <head><title>Bunway v0.1</title></head>
      <body>
        <h1>🚀 Welcome to Bunway v0.1</h1>
        <p>A Bun-native backend framework with preset-driven architecture</p>
        <ul>
          <li><a href="/users">GET /users - List users (JSON)</a></li>
          <li><a href="/users/123">GET /users/123 - Get user by ID (JSON)</a></li>
          <li><a href="/api/users">GET /api/users - Protected route (requires auth)</a></li>
        </ul>
      </body>
    </html>
  `);
});

/**
 * String-based controller syntax:  'ControllerName@method'
 */
app.get('/users', 'UserController@index');

/**
 * Direct class reference syntax: ControllerClass, 'method'
 */
app.get('/users/:id', UserController, 'show');

/**
 * Route grouping with middleware
 */
app.group('/api', () => {
    app.get('/users', (ctx) => {
        return ctx.json({
            message: 'Protected endpoint',
            user: (ctx as any).user || null,
        });
    }, [auth]);
});

export default app;