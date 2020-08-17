export class User {
    readonly id: string;
    email: string;
    name: string;
    avatar: string;
    promodoroDuration: number;

    constructor(options: {
        id?: string,
        email?: string,
        name?: string,
        avatar?: string,
        promodoroDuration?: number,
    } = {}) {
        this.id = options.id || null;
        this.email = options.email || '';
        this.name = options.name || '';
        this.avatar = options.avatar || '';
        this.promodoroDuration = options.promodoroDuration || 1500;
    }

    get roles(): string[] {
        return this.email.endsWith('google.com') ? ['USER', 'EMPLOYEE'] : ['USER'];
    }
}



