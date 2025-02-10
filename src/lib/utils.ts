import { fail } from "@sveltejs/kit";
import Database from "./server/db/Database";

export function failWithErrorAndData(status: number, error: string, ...data: unknown[]) {
    return fail(status, { error, ...data });
}

export function verifyEmailInput(email: string): boolean {
    return /^.+@.+\..+$/.test(email) && email.length < 256;
}

export async function verifyUsername(username: string): Promise<string> {
    if (username.length < 3 || username.length > 31) return "Your username needs to be 3 to 31 characters in length.";
    if (!username.match(/^[a-z0-9._-]+$/i)) return 'Your username can only contain alphanumeric (a-z, 0-9) symbols as well as dots, underscores and hyphens.';
    if (username !== username.trim()) return 'Your username cannot contain spaces.';
    const existingUser = await Database.userRepository.getUserByName(username);
    if (existingUser) return "Username is already taken.";
    return "";
}


interface ExpireOptions {
    seconds: number,
    minutes: number,
    hours: number,
    days: number,
}
export function expireIn(options: Partial<ExpireOptions>): Date {
    const filled: ExpireOptions = { ... { days: 0, hours: 0, minutes: 0, seconds: 0 }, ...options };

    return new Date(
        Date.now() +
        1000 * filled.seconds +
        1000 * 60 * filled.minutes +
        1000 * 60 * 60 * filled.hours +
        1000 * 60 * 60 * 24 * filled.days
    )
}