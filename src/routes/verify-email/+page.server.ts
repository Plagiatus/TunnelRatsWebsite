import { redirect, type ActionFailure } from '@sveltejs/kit';
import type { Actions, RequestEvent } from './$types.js';
import { deleteEmailVerificationTokenCookie, deleteSessionTokenCookie, getEmailVerificationTokenCookie, setEmailVerificationTokenCookie, setSessionTokenCookie } from '$lib/server/auth/cookies.js';
import Database from '$lib/server/db/Database.js';
import type { User } from '$lib/server/db/repositories/UserRepository.js';
import { RefillingTokenBucket } from '$lib/server/auth/rate-limiter.js';
import { failWithErrorAndData } from '$lib/utils.js';

const emailBucket = new RefillingTokenBucket(1, 60);
const codeBucket = new RefillingTokenBucket(3, 30);

export async function load(event: RequestEvent) {
    // token clicked in email
    if (event.url.searchParams.has("token")) {
        const token = event.url.searchParams.get("token")!;
        console.log({ token });
        const verification = await Database.emailVerificationRepository.get(token);
        if (verification) {
            deleteSessionTokenCookie(event);

            const sessionToken = Database.sessionRepository.generateSessionToken()
            const session = await Database.sessionRepository.createSession(sessionToken, verification.userId);
            setSessionTokenCookie(event, sessionToken, session.expiresAt);

            await confirmEmail(event, verification.email, verification.userId);

            return redirect(302, "/verify-email/confirmed");
        }
    }


    // logged in user
    if (!event.locals.user) return redirect(302, "/");
    // email already verified
    if (event.locals.user.emailVerified) return redirect(302, "/");

    // is there already an ongoing email verification?
    const verification = await Database.emailVerificationRepository.getForUser(event.locals.user.id);
    if (verification) return;

    // create a new one
    await createConfirmationEmail(event, event.locals.user);
}

export const actions: Actions = {
    resend: resendEmail,
    verify: verifyCode,
}

async function resendEmail(event: RequestEvent) {
    const blocker = await checkSharedBlockers(event);
    if (blocker) {
        return blocker;
    }

    const userAddress = event.getClientAddress();
    if (!emailBucket.check(userAddress, 1)) {
        return failWithErrorAndData(429, `You cannot request another email yet. Please wait another minute before requesting the next one.`);
    }

    await createConfirmationEmail(event, event.locals.user!);
    return {
        message: "A new code was sent to your email.",
    }
}

async function verifyCode(event: RequestEvent) {
    const blocker = await checkSharedBlockers(event);
    if (blocker) {
        return blocker;
    }

    const userAddress = event.getClientAddress();
    if (!codeBucket.check(userAddress, 1)) {
        return failWithErrorAndData(429, `You're trying too fast. Please wait a few seconds before you try again.`);
    }

    const data = await event.request.formData();
    const code = data.get("code");
    if (!code || typeof code !== "string") {
        return failWithErrorAndData(400, "Code invalid or missing.");
    }

    if (code.length !== 8) {
        return failWithErrorAndData(400, "Code needs to be 8 characters long.");
    }

    codeBucket.consume(userAddress, 1);


    const verification = await Database.emailVerificationRepository.getViaCode(code);
    if (!verification || verification.userId !== event.locals.user?.id) {
        return failWithErrorAndData(401, "Code is not correct.");
    }

    await confirmEmail(event, event.locals.user.email, event.locals.user.id);

    return redirect(302, "/verify-email/confirmed");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function checkSharedBlockers(event: RequestEvent): Promise<ActionFailure<any> | undefined> {
    if (!event.locals.user) {
        return failWithErrorAndData(401, "You are not logged in.");
    }
    if (event.locals.user.emailVerified) {
        return failWithErrorAndData(403, "You already confirmed your email address.");
    }
    const verificationId = getEmailVerificationTokenCookie(event);
    if (!verificationId) {
        return failWithErrorAndData(403, "You seem to not have a verification going on anymore. Please reload the page if you think this is a mistake.");
    }
    const verification = await Database.emailVerificationRepository.get(verificationId);
    if (!verification) {
        deleteEmailVerificationTokenCookie(event);
        return failWithErrorAndData(403, "Your verification request has timed out. Please start a new verification process.");
    }
    return;
}

async function createConfirmationEmail(event: RequestEvent, user: User) {
    const request = await Database.emailVerificationRepository.createEmailVerificationRequest(user.id, user.email);
    await Database.emailVerificationRepository.sendEmail(request);
    setEmailVerificationTokenCookie(event, request.id, request.expiresAt);
    emailBucket.consume(event.getClientAddress(), 1);
}

async function confirmEmail(event: RequestEvent, email: string, userId: number) {
    await Database.userRepository.setVerifiedEmail(userId, email);
    deleteEmailVerificationTokenCookie(event);
    await Database.emailVerificationRepository.removeEmailVerificationRequest(userId);
}