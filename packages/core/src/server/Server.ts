import type { BunwayConfig } from '../types/config';
import type { Router } from '../router/Router';
import { RequestHandler } from './RequestHandler';
import { ErrorHandler } from '../error/ErrorHandler';

/**
 * Bunway HTTP Server
 * Built on Bun. serve
 */
export class Server {
    private requestHandler: RequestHandler;
    private errorHandler: ErrorHandler;

    constructor(
        private config: BunwayConfig,
        private router: Router
    ) {
        this.requestHandler = new RequestHandler(router);
        this.errorHandler = new ErrorHandler(config.env);
    }

    /**
     * Start the server
     */
    async start(): Promise<void> {
        const server = Bun.serve({
            port: this.config.port,
            hostname: this.config.hostname,
            fetch: async (request: Request) => {
                try {
                    return await this.requestHandler.handle(request);
                } catch (error) {
                    return this.errorHandler.handle(error);
                }
            },
        });

        console.log(
            `Bunway server running on http://${this.config.hostname}:${this.config.port}`
        );

        return new Promise((resolve) => {
            process.on('SIGINT', () => {
                console.log('Shutting down server...');
                server.stop();
                resolve();
            });
        });
    }
}