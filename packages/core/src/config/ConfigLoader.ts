import type { BunwayConfig } from '../types/config';
import { configSchema } from './ConfigSchema';

/**
 * Loads and validates bunway.config.ts
 */
export class ConfigLoader {
    /**
     * Load configuration from file
     */
    static async load(configPath: string): Promise<BunwayConfig> {
        try {
            const module = await import(configPath);
            const config = module.default;

            // Validate
            const validated = configSchema.parse(config);

            // Freeze to prevent mutations
            return Object.freeze(validated) as BunwayConfig;
        } catch (error) {
            throw new Error(`Failed to load config from ${configPath}:  ${error}`);
        }
    }
}