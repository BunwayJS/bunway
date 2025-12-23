import { app, RouteLoader, Server } from '@bunway/core';
import config from '../bunway.config';

export async function bootstrap() {
    // Load routes from src/routes/web.ts
    await import('./routes/web');

    // Start server
    const server = new Server(config, app);
    await server.start();
}