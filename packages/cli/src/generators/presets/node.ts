import * as fs from 'fs';
import * as path from 'path';

export async function nodePreset(targetDir: string) {
    // bunway. config.ts
    const configContent = `import { defineConfig } from '@bunway/core';
import { nodePreset } from '@bunway/preset-node';

export default defineConfig({
  preset: 'node',
  ... nodePreset,
  port: parseInt(process.env.APP_PORT || '3000'),
  hostname: process.env.APP_HOST || 'localhost',
  env: process.env.APP_ENV as 'development' | 'production' || 'development',
});
`;

    fs.writeFileSync(path.join(targetDir, 'bunway.config.ts'), configContent);

    // src/bootstrap.ts
    const bootstrapContent = `import { app, ConfigLoader, RouteLoader, Server } from '@bunway/core';
import config from '../bunway.config';

export async function bootstrap() {
  // Load routes
  const routePath = new URL(config.routes, import.meta.url).pathname;
  await RouteLoader.load(routePath, app);

  // Start server
  const server = new Server(config, app);
  await server.start();
}
`;

    fs.writeFileSync(path.join(targetDir, 'src/bootstrap.ts'), bootstrapContent);

    // public/index.ts
    const indexContent = `import { bootstrap } from '../src/bootstrap';

bootstrap().catch((error) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});
`;

    fs.writeFileSync(path.join(targetDir, 'public/index.ts'), indexContent);

    // src/routes/web.ts
    const routesContent = `import { app } from '@bunway/core';
import { HomeController } from '@/controllers/HomeController';

// Inline handler
app.get('/', (ctx) => ctx.html('<h1>Welcome to Bunway</h1>'));

// String-based controller
app.get('/users', 'UserController@index');

// Export for route loader
export default app;
`;

    fs.writeFileSync(path.join(targetDir, 'src/routes/web.ts'), routesContent);

    // src/controllers/HomeController.ts
    const homeControllerContent = `import type { BunwayContext } from '@bunway/core';

export class HomeController {
  index(ctx: BunwayContext) {
    return ctx.json({ message: 'Hello from HomeController' });
  }
}
`;

    fs.writeFileSync(
        path.join(targetDir, 'src/controllers/HomeController.ts'),
        homeControllerContent
    );

    // src/controllers/UserController.ts
    const userControllerContent = `import type { BunwayContext } from '@bunway/core';

export class UserController {
  index(ctx: BunwayContext) {
    return ctx.json([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ]);
  }

  show(ctx: BunwayContext) {
    const { id } = ctx.params;
    return ctx.json({ id, name: \`User \${id}\` });
  }
}
`;

    fs.writeFileSync(
        path.join(targetDir, 'src/controllers/UserController.ts'),
        userControllerContent
    );

    // src/middleware/auth.ts
    const authContent = `import type { BunwayContext } from '@bunway/core';

export const auth = async (ctx: BunwayContext, next: () => Promise<Response>) => {
  const token = ctx.req.headers.get('authorization');
  
  if (!token) {
    return ctx.json({ error: 'Unauthorized' }, 401);
  }

  // Attach user to context (via declaration merging)
  (ctx as any).user = { id: 1, name: 'John Doe' };

  return next();
};
`;

    fs.writeFileSync(path.join(targetDir, 'src/middleware/auth.ts'), authContent);

    // Create . gitkeep files
    fs.writeFileSync(path.join(targetDir, 'storage/logs/.gitkeep'), '');
    fs.writeFileSync(path.join(targetDir, 'storage/cache/. gitkeep'), '');
}