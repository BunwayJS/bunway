/**
 * Node Preset for Bunway
 * 
 * A flat, explicit, flexible structure
 * Perfect for APIs and microservices
 */

export const nodePreset = {
    structure: 'node',
    paths: {
        routes: 'src/routes/web.ts',
        controllers: 'src/controllers',
        middleware: 'src/middleware',
        services: 'src/services',
        bootstrap: 'src/bootstrap.ts',
        config: 'bunway.config.ts',
    },
    description: 'Node:  Flat, explicit, flexible - perfect for APIs and microservices',
};

export default nodePreset;