
import Database from "$lib/server/db/Database";
import { error } from "@sveltejs/kit";

export async function load({params}) {
    const level = await Database.levelRepository.get(params.id);
    if(!level) return error(404);
    return {level};
}