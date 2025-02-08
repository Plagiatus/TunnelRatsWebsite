import Database from "$lib/server/db/Database";
import type { ServerInit } from "@sveltejs/kit";

export const init: ServerInit = async () => {
    Database.connect();
}