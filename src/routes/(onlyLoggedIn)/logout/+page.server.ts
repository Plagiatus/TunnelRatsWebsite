import { deleteSessionTokenCookie } from '$lib/server/auth/cookies';
import Database from '$lib/server/db/Database';
import type { ServerLoadEvent } from '@sveltejs/kit';

export const load = (event) => {
    if (event.locals.session) {
        logout(event);
    }
}

async function logout(event: ServerLoadEvent){
    await Database.sessionRepository.invalidateSession(event.locals.session!.id);
    deleteSessionTokenCookie(event);

}