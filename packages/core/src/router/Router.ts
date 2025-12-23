import type { BunwayContext } from '../types/context';
import type { Route, RouteHandler, HttpMethod } from '../types/router';
import type { Middleware } from '../types/middleware';
import { RouteGroup } from './RouteGroup';
import { ControllerResolver } from './ControllerResolver';
import { MiddlewarePipeline } from '../middleware/MiddlewarePipeline';

export class Router {
    private routes: Route[] = [];
    private groups: RouteGroup[] = [];
    private currentGroup: RouteGroup | null = null;

    /**
     * Register HTTP GET route
     */
    get(path: string, handler: RouteHandler, middleware?: Middleware[]): this {
        return this.register('GET', path, handler, middleware);
    }

    /**
     * Register HTTP POST route
     */
    post(path: string, handler: RouteHandler, middleware?: Middleware[]): this {
        return this.register('POST', path, handler, middleware);
    }

    /**
     * Register HTTP PUT route
     */
    put(path: string, handler: RouteHandler, middleware?: Middleware[]): this {
        return this.register('PUT', path, handler, middleware);
    }

    /**
     * Register HTTP DELETE route
     */
    delete(path: string, handler: RouteHandler, middleware?: Middleware[]): this {
        return this.register('DELETE', path, handler, middleware);
    }

    /**
     * Register HTTP PATCH route
     */
    patch(path: string, handler: RouteHandler, middleware?: Middleware[]): this {
        return this.register('PATCH', path, handler, middleware);
    }

    /**
     * Register HTTP OPTIONS route
     */
    options(path: string, handler: RouteHandler, middleware?: Middleware[]): this {
        return this.register('OPTIONS', path, handler, middleware);
    }

    /**
     * Register HTTP HEAD route
     */
    head(path: string, handler: RouteHandler, middleware?: Middleware[]): this {
        return this.register('HEAD', path, handler, middleware);
    }

    /**
     * Register route group with prefix
     */
    group(
        prefix: string,
        callback: (group: RouteGroup) => void,
        middleware?: Middleware[]
    ) {
        const group = new RouteGroup(prefix, middleware);
        this.currentGroup = group;
        callback(group);
        this.currentGroup = null;
        this.groups.push(group);
    }

    /**
     * Register a route
     */
    private register(
        method: HttpMethod,
        path: string,
        handler: RouteHandler,
        middleware?: Middleware[]
    ): this {
        const fullPath = this.currentGroup
            ? this.currentGroup.prefix + path
            : path;

        const route: Route = {
            method,
            path: fullPath,
            handler,
            middleware: [
                ...(this.currentGroup?.middleware || []),
                ...(middleware || []),
            ],
        };

        this.routes.push(route);

        return this;
    }

    /**
     * Find a matching route
     */
    findRoute(
        method: string,
        path: string
    ): { route: Route; params: Record<string, string> } | null {
        for (const route of this.routes) {
            if (route.method !== method.toUpperCase()) continue;

            const match = this.matchPath(route.path, path);
            if (match) {
                return { route, params: match };
            }
        }
        return null;
    }

    /**
     * Match path with parameters
     */
    private matchPath(
        routePath: string,
        requestPath: string
    ): Record<string, string> | null {
        const routeParts = routePath.split('/').filter(Boolean);
        const requestParts = requestPath.split('/').filter(Boolean);

        if (routeParts.length !== requestParts.length) {
            return null;
        }

        const params: Record<string, string> = {};

        for (let i = 0; i < routeParts.length; i++) {
            const routePart = routeParts[i];
            const requestPart = requestParts[i];

            if (routePart.startsWith(': ')) {
                const paramName = routePart.slice(1);
                params[paramName] = requestPart;
            } else if (routePart !== requestPart) {
                return null;
            }
        }

        return params;
    }

    /**
     * Get all routes
     */
    getRoutes(): Route[] {
        return this.routes;
    }

    /**
     * Resolve handler to executable function
     */
    async resolveHandler(
        handler: RouteHandler,
        ctx: BunwayContext
    ): Promise<(ctx: BunwayContext) => Response | Promise<Response>> {
        if (typeof handler === 'function') {
            return handler as any;
        }

        if (typeof handler === 'string') {
            return ControllerResolver.resolveString(handler);
        }

        if (Array.isArray(handler)) {
            return ControllerResolver.resolveDirect(handler[0], handler[1]);
        }

        throw new Error('Invalid handler type');
    }
}