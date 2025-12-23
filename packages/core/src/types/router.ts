import type { BunwayContext } from './context';
import type { Middleware } from './middleware';

export type HttpMethod =
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'PATCH'
    | 'OPTIONS'
    | 'HEAD';

export type RouteHandler =
    | ((ctx: BunwayContext) => Response | Promise<Response>)
    | string // 'ControllerName@method'
    | [typeof Function, string]; // [ControllerClass, 'method']

export interface Route {
    method: HttpMethod;
    path: string;
    handler: RouteHandler;
    middleware?: Middleware[];
}

export interface RouteGroup {
    prefix: string;
    middleware?: Middleware[];
    routes: Route[];
}