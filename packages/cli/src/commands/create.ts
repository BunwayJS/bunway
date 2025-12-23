import { ProjectGenerator } from '../generators/ProjectGenerator';
import * as fs from 'fs';
import * as path from 'path';

export async function createCommand(appName: string | undefined) {
    if (!appName) {
        console.error('Error: App name is required');
        console.log('Usage:  bunway create <app-name>');
        process.exit(1);
    }

    const generator = new ProjectGenerator(appName);

    try {
        console.log(`🚀 Creating Bunway app: ${appName}`);
        await generator.generate();
        console.log(`✅ App created successfully! `);
        console.log(`
Next steps:
  cd ${appName}
  bun install
  bun run dev
    `);
    } catch (error) {
        console.error(`❌ Error:  ${error}`);
        process.exit(1);
    }
}