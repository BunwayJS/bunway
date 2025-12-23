import { BunwayContext } from '@bunway/core';

/**
 * Authentication middleware
 * Checks for Bearer token in Authorization header
 */
export const auth = async (ctx: BunwayContext, next: () => Promise<Response>) => {
    const authHeader = ctx.req.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return ctx.json(
            { error: 'Unauthorized - Missing or invalid token' },
            401
        );
    }

    const token = authHeader.slice(7); // Remove 'Bearer ' prefix

    // Validate token (dummy validation for demo)
    if (token !== 'valid-token-123') {
        return ctx.json({ error: 'Unauthorized - Invalid token' }, 401);
    }

    // Attach user to context via declaration merging
    (ctx as any).user = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
    };

    return next();
};