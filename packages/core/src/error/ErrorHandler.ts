/**
 * Centralized error handling
 * Separate from middleware pipeline
 */
export class ErrorHandler {
    constructor(private env: 'development' | 'production' = 'production') { }

    /**
     * Handle error and return response
     */
    handle(error: unknown): Response {
        console.error('Error:', error);

        if (error instanceof BunwayError) {
            return this.handleBunwayError(error);
        }

        return this.handle500();
    }

    /**
     * Handle 404 Not Found
     */
    handle404(): Response {
        const message =
            this.env === 'development'
                ? '<h1>404 Not Found</h1><p>The requested resource was not found.</p>'
                : '<h1>404 Not Found</h1>';

        return new Response(message, {
            status: 404,
            headers: { 'Content-Type': 'text/html' },
        });
    }

    /**
     * Handle 500 Internal Server Error
     */
    handle500(error?: Error): Response {
        const message =
            this.env === 'development'
                ? `<h1>500 Internal Server Error</h1><pre>${error?.message || 'Unknown error'}</pre>`
                : '<h1>500 Internal Server Error</h1>';

        return new Response(message, {
            status: 500,
            headers: { 'Content-Type': 'text/html' },
        });
    }

    /**
     * Handle Bunway-specific errors
     */
    private handleBunwayError(error: BunwayError): Response {
        if (error.status === 404) {
            return this.handle404();
        }

        return new Response(JSON.stringify({ error: error.message }), {
            status: error.status,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

/**
 * Custom Bunway error
 */
export class BunwayError extends Error {
    constructor(
        public message: string,
        public status: number = 500
    ) {
        super(message);
        this.name = 'BunwayError';
    }
}