import { dev } from "$app/environment";
import { deleteSessionTokenCookie, getSessionTokenCookie, setSessionTokenCookie as setSessionTokenCookie } from "$lib/server/auth/cookies";
import { RefillingTokenBucket } from "$lib/server/auth/rate-limiter";
import Database from "$lib/server/db/Database";
import { type ServerInit, type Handle, error } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

export const init: ServerInit = async () => {
	Database.connect();
}

const bucket = new RefillingTokenBucket<string>(100, 1);

const rateLimitHandle: Handle = async ({ event, resolve }) => {
	let clientIp = event.getClientAddress();
	if (dev && !clientIp) { clientIp = "localhost" };
	if (!clientIp) return error(400);

	let cost: number = 1;
	if (event.request.method === "GET" || event.request.method === "OPTIONS") {
		cost = 1;
	} else {
		cost = 3;
	}
	if (!bucket.consume(clientIp, cost)) {
		return error(429);
	}
	return resolve(event);

}

const authHandle: Handle = async ({ event, resolve }) => {
	const sessionToken = getSessionTokenCookie(event);
	if (!sessionToken) {
		event.locals.user = undefined;
		event.locals.session = undefined;
		return resolve(event);
	}

	const session = await Database.sessionRepository.validateSessionToken(sessionToken);
	if (session) {
		setSessionTokenCookie(event, sessionToken, session.expiresAt);
		event.locals.session = session;
		const user = await Database.userRepository.get(session.userId);
		event.locals.user = user ?? undefined;
	} else {
		deleteSessionTokenCookie(event);
		event.locals.user = undefined;
		event.locals.session = undefined;
	}

	return resolve(event);
};

export const handle = sequence(rateLimitHandle, authHandle);