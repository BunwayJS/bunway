import type { BunwayContext } from './context';

export type MiddlewareHandler = (
    ctx: BunwayContext,
    next: () => Promise<Response>
) => Response | Promise<Response>;

export type Middleware = MiddlewareHandler | string; // string for named middleware (future)

export interface MiddlewarePipeline {
    use(middleware: Middleware | Middleware[]): void;
    execute(
        ctx: BunwayContext,
        finalHandler: () => Promise<Response>
    ): Promise<Response>;
}