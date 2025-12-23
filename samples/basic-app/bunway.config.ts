import { defineConfig } from '@bunway/core';
import { nodePreset } from '@bunway/preset-node';

export default defineConfig({
    preset: 'node',
    ...nodePreset.paths,
    port: parseInt(process.env.APP_PORT || '4000'),
    hostname: process.env.APP_HOST || 'localhost',
    env: (process.env.APP_ENV as 'development' | 'production') || 'development',
});