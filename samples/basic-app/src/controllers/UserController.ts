import { BunwayContext } from '@bunway/core';
import { UserService } from '@/services/UserService';

export class UserController {
    private userService = new UserService();

    index(ctx: BunwayContext) {
        const users = this.userService.getAll();
        return ctx.json(users);
    }

    show(ctx: BunwayContext) {
        const { id } = ctx.params;
        const user = this.userService.getById(parseInt(id));

        if (!user) {
            return ctx.json({ error: 'User not found' }, 404);
        }

        return ctx.json(user);
    }
}