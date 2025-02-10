import type { RequestEvent } from "@sveltejs/kit";

const sessionCookieIdentifier = "session";
const emailVerificationCookieIdentifier = "email-verification";

export function getSessionTokenCookie(event: RequestEvent): string | undefined {
    return event.cookies.get(sessionCookieIdentifier);
}

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date): void {
    event.cookies.set(sessionCookieIdentifier, token, {
        httpOnly: true,
        sameSite: "lax",
        expires: expiresAt,
        path: "/",
    });
}

export function deleteSessionTokenCookie(event: RequestEvent): void {
    event.cookies.set(sessionCookieIdentifier, "", {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 0,
        path: "/",
    });
}

export function getEmailVerificationTokenCookie(event: RequestEvent): string | undefined {
    return event.cookies.get(emailVerificationCookieIdentifier);
}

export function setEmailVerificationTokenCookie(event: RequestEvent, token: string, expiresAt: Date): void {
    event.cookies.set(emailVerificationCookieIdentifier, token, {
        httpOnly: true,
        sameSite: "lax",
        expires: expiresAt,
        path: "/",
    });
}

export function deleteEmailVerificationTokenCookie(event: RequestEvent): void {
    event.cookies.set(emailVerificationCookieIdentifier, "", {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 0,
        path: "/",
    });
}