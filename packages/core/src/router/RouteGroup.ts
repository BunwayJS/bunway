import type { RouteHandler, HttpMethod } from '../types/router';
import type { Middleware } from '../types/middleware';

export class RouteGroup {
    constructor(
        public prefix: string,
        public middleware: Middleware[] = []
    ) { }

    /**
     * Register route in group (delegated to parent router)
     */
    private routes: any[] = [];

    addRoute(method: HttpMethod, path: string, handler: RouteHandler) {
        this.routes.push({ method, path: this.prefix + path, handler });
    }

    addMiddleware(middleware: Middleware | Middleware[]) {
        this.middleware = Array.isArray(middleware)
            ? [...this.middleware, ...middleware]
            : [... this.middleware, middleware];
    }

    getRoutes() {
        return this.routes;
    }
}