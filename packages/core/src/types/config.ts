import type { z } from 'zod';
import type { configSchema } from '../config/ConfigSchema';

export type PresetType = 'node' | 'mvc' | 'webbyphp' | 'minimal';

export interface BunwayConfig {
    preset: PresetType;
    routes: string;
    port: number;
    hostname: string;
    env: 'development' | 'production';
    [key: string]: any;
}

export type BunwayConfigSchema = z.infer<typeof configSchema>;