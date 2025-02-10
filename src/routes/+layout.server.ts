import type { User } from '$lib/server/db/repositories/UserRepository.js';

export const load = ({ locals }) => {
    if (locals.user) {
        const user: Partial<User> = locals.user;
        delete user.passwordHash;
        return { user }
    }
}
