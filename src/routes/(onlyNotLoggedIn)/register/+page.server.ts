import { dev } from "$app/environment";
import { RefillingTokenBucket } from "$lib/server/auth/rate-limiter";
import { fail, redirect } from "@sveltejs/kit";
import type { Action, Actions } from "./$types";
import { failWithErrorAndData, verifyEmailInput, verifyUsername } from "$lib/utils";
import Database from "$lib/server/db/Database";
import { getPasswordValidationError } from "$lib/server/auth/password";
import { setSessionTokenCookie } from "$lib/server/auth/cookies";

const bucket = new RefillingTokenBucket<string>(20, 1);

const registerAction: Action = async (event) => {
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
    const email = data.get("email");
    const password = data.get("password");

    if (!username || typeof username !== "string") {
        return failWithErrorAndData(400, "Username invalid or missing.", username, email);
    }
    const usernameError = await verifyUsername(username);
    if (usernameError) {
        return failWithErrorAndData(400, usernameError, username, email)
    }


    if (!email || typeof email !== "string" || !verifyEmailInput(email)) {
        return failWithErrorAndData(400, "Email invalid or missing.", username, email);
    }
    if (await Database.userRepository.getUserByEmail(email)) {
        return failWithErrorAndData(400, "Email is already taken.", username, email);
    }

    if (!password || typeof password !== "string") {
        return failWithErrorAndData(400, "Password invalid or missing.", username, email, password);
    }
    const pwError = await getPasswordValidationError(password);
    if (pwError) {
        return failWithErrorAndData(400, pwError, username, email, password);
    }

    const user = await Database.userRepository.createNewUser(username, email, password);
    // TODO 2FA
    console.log(user);

    const sessionToken = Database.sessionRepository.generateSessionToken();
    const session = await Database.sessionRepository.createSession(sessionToken, user.id);
    setSessionTokenCookie(event, sessionToken, session.expiresAt);

    return redirect(302, "/verify-email");
}
export const actions: Actions = {
    default: registerAction,
}