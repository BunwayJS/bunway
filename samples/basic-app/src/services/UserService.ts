interface User {
    id: number;
    name: string;
    email: string;
}

export class UserService {
    private users: User[] = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    ];

    getAll(): User[] {
        return this.users;
    }

    getById(id: number): User | undefined {
        return this.users.find(user => user.id === id);
    }
}