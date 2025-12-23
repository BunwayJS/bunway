# Getting Started with Bunway v0.1

## Installation

### Prerequisites

- Bun >= 1.0.0 ([Install Bun](https://bun.sh))

### Create a New Project

```bash
bunway create my-app
cd my-app
bun install
```

This creates a new Bunway project with the **node** preset.

## Project Structure

```
my-app/
├── src/
│   ├── routes/web.ts          ← All routes
│   ├── controllers/           ← HTTP handlers
│   ├── middleware/            ← Request middleware
│   ├── services/              ← Business logic
│   └── bootstrap.ts           ← App initialization
│
├── public/index.ts            ← Entry point
├── storage/                   ← Logs & cache
├── bunway.config.ts           ← Configuration
├── package.json
├── tsconfig.json
└── . env
```

## Your First Route

Open `src/routes/web.ts`:

```typescript
import { app } from '@bunway/core';

// Inline handler
app.get('/', (ctx) => {
  return ctx.json({ message: 'Hello, Bunway!' });
});

export default app;
```

## Run the Server

```bash
bun run dev
```

Visit: `http://localhost:3000`

You should see: 
```json
{ "message": "Hello, Bunway!" }
```

## Add a Controller

Create `src/controllers/UserController.ts`:

```typescript
import { BunwayContext } from '@bunway/core';

export class UserController {
  index(ctx: BunwayContext) {
    return ctx.json([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ]);
  }

  show(ctx: BunwayContext) {
    const { id } = ctx.params;
    return ctx.json({ id, name: `User ${id}` });
  }
}
```

## Add Routes

Update `src/routes/web.ts`:

```typescript
import { app } from '@bunway/core';
import { UserController } from '@/controllers/UserController';

// String-based syntax
app.get('/users', 'UserController@index');

// Direct reference syntax
app.get('/users/:id', UserController, 'show');

export default app;
```

Test: 
```bash
curl http://localhost:3000/users
curl http://localhost:3000/users/1
```

## Add Middleware

Create `src/middleware/auth.ts`:

```typescript
export const auth = async (ctx, next) => {
  const token = ctx.req.headers.get('authorization');
  
  if (!token) {
    return ctx.json({ error: 'Unauthorized' }, 401);
  }

  ctx.user = { id: 1, name: 'John' };
  return next();
};
```

Use in routes: 

```typescript
import { auth } from '@/middleware/auth';

app.get('/protected', (ctx) => {
  return ctx.json({ user: ctx.user });
}).middleware(auth);
```

## Add a Service

Create `src/services/UserService.ts`:

```typescript
export class UserService {
  getUsers() {
    return [
      { id: 1, name: 'Alice' },
      { id: 2, name:  'Bob' },
    ];
  }
}
```

Use in controller:

```typescript
import { UserService } from '@/services/UserService';

export class UserController {
  private userService = new UserService();

  index(ctx) {
    return ctx.json(this.userService.getUsers());
  }
}
```

## Route Grouping

```typescript
app.group('/api', () => {
  app.get('/users', UserController, 'index');
  app.get('/users/:id', UserController, 'show');
});
```

Access:  `GET /api/users`

## Environment Variables

Create `.env`:

```env
APP_PORT=3000
APP_HOST=localhost
APP_ENV=development
```

Use in `bunway.config.ts`:

```typescript
export default defineConfig({
  preset: 'node',
  port: parseInt(process.env.APP_PORT || '3000'),
  hostname: process.env.APP_HOST || 'localhost',
  env: process.env.APP_ENV || 'development',
});
```

## Next Steps

- Read [Routing Guide](./ROUTING.md)
- Read [Middleware Guide](./MIDDLEWARE.md)
- Read [Controllers Guide](./CONTROLLERS.md)
- Check [sample app](../../samples/basic-app/)

---

## Troubleshooting

### "Module not found" errors

Ensure your `tsconfig.json` has correct path mappings:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### Port already in use

Change `APP_PORT` in `.env`:

```env
APP_PORT=3001
```

### Changes not applied

v0.1 does not have hot reload.  Restart the server: 

```bash
# Stop:  Ctrl+C
# Start: bun run dev
```

Hot reload is planned for v0.3.

---

## What's Next?

You now have a working Bunway application! 

Explore: 
- [Routing API](./ROUTING.md)
- [Middleware Pipeline](./MIDDLEWARE.md)
- [Controller Patterns](./CONTROLLERS.md)
- [Error Handling](./ERRORS.md)
- [Configuration Reference](./CONFIG.md)