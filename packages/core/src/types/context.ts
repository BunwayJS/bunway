/**
 * Base context object for all requests
 * Extensible via declaration merging
 */
export interface BunwayContext {
    // Request
    req: BunwayContextRequest;

    // Response helpers
    json(data: unknown, status?: number): Response;
    text(text: string, status?: number): Response;
    redirect(url: string, status?: number): Response;
    html(html: string, status?: number): Response;

    // Route parameters
    params: Record<string, string>;

    // Query parameters
    query: Record<string, string>;

    // Request body (if parsed)
    body?: unknown;

    // State object (extensible by middleware)
    state: Record<string, any>;

    // Allow middleware to extend context
    [key: string]: any;
}

export interface BunwayContextRequest {
    method: string;
    url: string;
    headers: Headers;
    body?: ReadableStream<Uint8Array> | null;
}

export interface BunwayContextResponse {
    status: number;
    headers: Record<string, string> | Headers;
    body: string | Blob | ArrayBuffer | ReadableStream | null;
}

/**
 * Declare module to enable TypeScript declaration merging
 * Middleware can extend BunwayContext like: 
 *
 * declare module '@bunway/core' {
 *   interface BunwayContext {
 *     user?:  AuthUser;
 *   }
 * }
 */
declare module '@bunway/core' {
    interface BunwayContext {
        // Extensible via declaration merging
    }
}