import type { BunwayContext } from '../types/context';
import type { Router } from '../router/Router';
import { MiddlewarePipeline } from '../middleware/MiddlewarePipeline';
import { createResponseHelpers } from '../response/ResponseHelpers';
import { ErrorHandler } from '../error/ErrorHandler';

/**
 * Handles incoming requests and routes them
 */
export class RequestHandler {
    constructor(private router: Router) { }

    /**
     * Handle incoming request
     */
    async handle(request: Request): Promise<Response> {
        const url = new URL(request.url);
        const pathname = url.pathname;
        const method = request.method;

        // Parse query string
        const query: Record<string, string> = {};
        url.searchParams.forEach((value, key) => {
            query[key] = value;
        });

        // Parse body if applicable
        let body: unknown = undefined;
        if (['POST', 'PUT', 'PATCH'].includes(method)) {
            try {
                const contentType = request.headers.get('content-type');
                if (contentType?.includes('application/json')) {
                    body = await request.json();
                }
            } catch (error) {
                // Ignore parse errors
            }
        }

        // Find matching route
        const match = this.router.findRoute(method, pathname);

        if (!match) {
            return new ErrorHandler('development').handle404();
        }

        const { route, params } = match;

        // Create context object
        const ctx: BunwayContext = {
            req: {
                method,
                url: request.url,
                headers: request.headers,
                body: request.body,
            },
            params,
            query,
            body,
            state: {},
            ...createResponseHelpers(),
        };

        // Execute middleware pipeline
        const pipeline = new MiddlewarePipeline();
        pipeline.use(route.middleware || []);

        return pipeline.execute(ctx, async () => {
            // Resolve and execute handler
            const handler = await this.router.resolveHandler(route.handler, ctx);
            return handler(ctx);
        });
    }
}
