import * as fs from 'fs';
import * as path from 'path';
import { nodePreset } from './presets/node';

export class ProjectGenerator {
    private targetDir: string;
    private preset = 'node';

    constructor(private appName: string) {
        this.targetDir = path.join(process.cwd(), appName);
    }

    async generate() {
        // Create directories
        this.createDirectories();

        // Generate files based on preset
        if (this.preset === 'node') {
            await nodePreset(this.targetDir);
        }

        // Generate common files
        this.generatePackageJson();
        this.generateTsConfig();
        this.generateGitignore();
        this.generateEnvExample();
    }

    private createDirectories() {
        const dirs = [
            'src/routes',
            'src/controllers',
            'src/middleware',
            'src/services',
            'public',
            'storage/logs',
            'storage/cache',
        ];

        for (const dir of dirs) {
            const fullPath = path.join(this.targetDir, dir);
            fs.mkdirSync(fullPath, { recursive: true });
        }
    }

    private generatePackageJson() {
        const pkgJson = {
            name: this.appName,
            version: '1.0.0',
            type: 'module',
            scripts: {
                dev: 'bun run public/index.ts',
                build: 'bun build ./public/index.ts --outdir ./dist',
                start: 'bun dist/index.js',
            },
            dependencies: {
                '@bunway/core': '^0.1.0',
                '@bunway/preset-node': '^0.1.0',
            },
            devDependencies: {
                '@types/bun': 'latest',
                typescript: '^5.3.0',
            },
        };

        fs.writeFileSync(
            path.join(this.targetDir, 'package.json'),
            JSON.stringify(pkgJson, null, 2)
        );
    }

    private generateTsConfig() {
        const tsconfig = {
            compilerOptions: {
                target: 'ES2020',
                lib: ['ES2020'],
                module: 'ESNext',
                moduleResolution: 'bundler',
                strict: true,
                esModuleInterop: true,
                skipLibCheck: true,
                forceConsistentCasingInFileNames: true,
                resolveJsonModule: true,
                baseUrl: '.',
                paths: {
                    '@/*': ['src/*'],
                },
            },
            include: ['src/**/*. ts', 'public/**/*.ts'],
            exclude: ['node_modules'],
        };

        fs.writeFileSync(
            path.join(this.targetDir, 'tsconfig.json'),
            JSON.stringify(tsconfig, null, 2)
        );
    }

    private generateGitignore() {
        const gitignore = `node_modules/
bun. lockb
dist/
.env. local
.DS_Store
*.log
storage/logs/*
storage/cache/*
!storage/logs/. gitkeep
!storage/cache/.gitkeep
`;

        fs.writeFileSync(path.join(this.targetDir, '.gitignore'), gitignore);
    }

    private generateEnvExample() {
        const env = `APP_NAME=${this.appName}
APP_ENV=development
APP_PORT=3000
APP_HOST=localhost
`;

        fs.writeFileSync(path.join(this.targetDir, '.env.example'), env);
    }
}