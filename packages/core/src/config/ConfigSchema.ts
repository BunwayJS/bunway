import { z } from 'zod';
import type { BunwayConfig } from '../types/config';

/**
 * Zod schema for bunway. config.ts validation
 * Frozen at runtime - no mutations allowed
 */
export const configSchema = z.object({
    preset: z.enum(['node', 'mvc', 'webbyphp', 'minimal']),
    routes: z.string(),
    port: z.number().int().positive().default(3000),
    hostname: z.string().default('localhost'),
    env: z.enum(['development', 'production']).default('development'),
});

/**
 * Helper to define config with type inference
 */
export function defineConfig(config: BunwayConfig): BunwayConfig {
    const validated = configSchema.parse(config);
    return Object.freeze(validated) as BunwayConfig;
}