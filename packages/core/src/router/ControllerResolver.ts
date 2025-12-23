import type { BunwayContext } from '../types/context';

/**
 * Resolves controller syntax variations into executable handlers
 * 
 * Supported syntaxes:
 * 1. Inline: (ctx) => ctx.json({})
 * 2. String: 'UserController@index'
 * 3. Direct: UserController, 'index'
 */
export class ControllerResolver {
    /**
     * Resolve string-based controller syntax:  'ControllerName@method'
     */
    static async resolveString(
        controllerString: string
    ): Promise<(ctx: BunwayContext) => Promise<Response>> {
        const [controllerName, methodName] = controllerString.split('@');

        if (!controllerName || !methodName) {
            throw new Error(
                `Invalid controller syntax: ${controllerString}. Expected: ControllerName@method`
            );
        }

        try {
            // Dynamically import controller
            // This assumes controllers are in src/controllers
            const module = await import(`../controllers/${controllerName}.ts`);
            const ControllerClass = module[controllerName];

            if (!ControllerClass) {
                throw new Error(
                    `Controller class ${controllerName} not found in ${controllerName}.ts`
                );
            }

            const instance = new ControllerClass();
            const method = instance[methodName];

            if (typeof method !== 'function') {
                throw new Error(
                    `Method ${methodName} not found on controller ${controllerName}`
                );
            }

            return (ctx: BunwayContext) =>
                Promise.resolve(method.call(instance, ctx));
        } catch (error) {
            throw new Error(
                `Failed to resolve controller ${controllerString}:  ${error}`
            );
        }
    }

    /**
     * Resolve direct class reference syntax: ControllerClass, 'method'
     */
    static async resolveDirect(
        ControllerClass: any,
        methodName: string
    ): Promise<(ctx: BunwayContext) => Promise<Response>> {
        if (typeof ControllerClass !== 'function') {
            throw new Error(
                `Expected a class constructor, got ${typeof ControllerClass}`
            );
        }

        const instance = new ControllerClass();
        const method = instance[methodName];

        if (typeof method !== 'function') {
            throw new Error(`Method ${methodName} not found on controller`);
        }

        return (ctx: BunwayContext) =>
            Promise.resolve(method.call(instance, ctx));
    }
}