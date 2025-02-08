import Database from "$lib/server/db/Database";

export async function load() {
    return { levels: await Database.levelRepository.getMultiple({}, 10) };
}