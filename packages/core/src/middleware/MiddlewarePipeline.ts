import type { BunwayContext } from '../types/context';
import type { Middleware, MiddlewareHandler } from '../types/middleware';

/**
 * Composes middleware into a single pipeline
 * Executes middleware in sequence
 * Allows middleware to short-circuit requests
 */
export class MiddlewarePipeline {
    private middleware: MiddlewareHandler[] = [];

    /**
     * Add middleware to pipeline
     */
    use(middleware: Middleware | Middleware[]): void {
        const mws = Array.isArray(middleware) ? middleware : [middleware];
        for (const mw of mws) {
            if (typeof mw === 'function') {
                this.middleware.push(mw);
            }
        }
    }

    /**
     * Execute middleware pipeline
     */
    async execute(
        ctx: BunwayContext,
        finalHandler: () => Promise<Response>
    ): Promise<Response> {
        let index = 0;

        const next = async (): Promise<Response> => {
            if (index >= this.middleware.length) {
                return finalHandler();
            }

            const currentMiddleware = this.middleware[index++];
            return currentMiddleware(ctx, next);
        };

        return next();
    }
}