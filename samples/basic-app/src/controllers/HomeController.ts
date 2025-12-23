import { BunwayContext } from '@bunway/core';

export class HomeController {
    index(ctx: BunwayContext) {
        return ctx.json({
            message: 'Welcome to Bunway',
            version: '0.1.0',
        });
    }
}