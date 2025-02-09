import { dev } from "$app/environment";
import { RefillingTokenBucket } from "$lib/server/auth/rate-limiter";
import { fail, redirect } from "@sveltejs/kit";
import type { Action, Actions } from "./$types";
import { failWithErrorAndData } from "$lib/utils";
import Database from "$lib/server/db/Database";
import { isPasswordValid } from "$lib/server/auth/password";
import { setSessionTokenCookie } from "$lib/server/auth/cookies";

const bucket = new RefillingTokenBucket<string>(20, 1);

const loginAction: Action = async (event) => {

    let clientIp = event.getClientAddress();
    if (dev && !clientIp) { clientIp = "localhost" };
    const data = await event.request.formData();

    if (!bucket.consume(clientIp, 1)) {
        return fail(429, {
            error: "Too many requests, please try again in a few seconds.",
            username: data.get("username"),
        });
    }

    const username = data.get("username");
    const password = data.get("password");

    if (!username || typeof username !== "string") {
        return failWithErrorAndData(400, "Username invalid or missing.", username);
    }
    if (!password || typeof password !== "string") {
        return failWithErrorAndData(400, "Password invalid or missing.", username, password);
    }

    const user = await Database.userRepository.getUserByName(username);
    if (!user) {
        return failWithErrorAndData(400, "Account not found. Do you need to register?", username);
    }

    if (!await isPasswordValid(password, user.passwordHash)) {
        return failWithErrorAndData(400, "Wrong password.", username, password);
    }

    const sessionToken = Database.sessionRepository.generateSessionToken();
    const session = await Database.sessionRepository.createSession(sessionToken, user.id);
    setSessionTokenCookie(event, sessionToken, session.expiresAt);

    // TODO email verification
    // TODO 2FA
    // https://github.com/lucia-auth/example-sveltekit-email-password-2fa/blob/main/src/routes/login/%2Bpage.server.ts

    return redirect(302, "/");
}
export const actions: Actions = {
    default: loginAction,
}