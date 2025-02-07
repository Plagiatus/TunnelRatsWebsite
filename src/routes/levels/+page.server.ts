import { getLevels } from "$lib/server/db";

export function load() {
    return {levels: getLevels()};
}