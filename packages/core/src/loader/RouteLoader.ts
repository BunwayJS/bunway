import type { Router } from '../router/Router';

/**
 * Loads routes from explicit route file
 * No auto-discovery
 * Startup only (no runtime registration)
 */
export class RouteLoader {
    /**
     * Load routes from file
     */
    static async load(routeFilePath: string, router: Router): Promise<void> {
        try {
            await import(routeFilePath);
            console.log(`Routes loaded from ${routeFilePath}`);
        } catch (error) {
            throw new Error(`Failed to load routes from ${routeFilePath}: ${error}`);
        }
    }
}