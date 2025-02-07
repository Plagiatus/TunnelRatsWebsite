import { getLevels } from "$lib/server/db";
import { error } from "@sveltejs/kit";

export function load({params}) {
    const level = getLevels().find((v) => v.name === params.id);
    if(!level) return error(404);
    return {level};
}