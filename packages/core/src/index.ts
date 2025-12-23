// Export types
export type {
    BunwayContext,
    BunwayContextRequest,
    BunwayContextResponse,
} from './types/context';

export type {
    BunwayConfig,
    BunwayConfigSchema,
    PresetType,
} from './types/config';

export type {
    Route,
    RouteHandler,
    HttpMethod,
} from './types/router';

export type {
    Middleware,
    MiddlewareHandler,
} from './types/middleware';

// Export core classes
export { Router } from './router/Router';
export { RouteGroup } from './router/RouteGroup';
export { ControllerResolver } from './router/ControllerResolver';
export { Server } from './server/Server';
export { ConfigLoader } from './config/ConfigLoader';
export { RouteLoader } from './loader/RouteLoader';
export { ErrorHandler, BunwayError } from './error/ErrorHandler';

// Export response helpers
export { createResponseHelpers } from './response/ResponseHelpers';

// Export middleware utilities
export { MiddlewarePipeline } from './middleware/MiddlewarePipeline';

// Export schema
export { configSchema, defineConfig } from './config/ConfigSchema';

// Create singleton app instance
import { Router } from './router/Router';

export const app = new Router();