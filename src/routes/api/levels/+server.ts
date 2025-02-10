import Database from "$lib/server/db/Database";
import type { LevelSearchOptions } from "$lib/server/db/repositories/LevelRepository";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async (event): Promise<Response> => {
    const params = event.url.searchParams;

    try {
        const searchOptions: LevelSearchOptions = {
            limit: Number(params.get("limit") ?? 10),
            random: Boolean(params.get("random") ?? false),
            skip: Number(params.get("skip") ?? 0),
            tags: params.getAll("tag"),
            search: params.get("search") ?? "",
            sort: JSON.parse(params.get("sort") ?? "{}"),
            versions: params.getAll("version").map(v => Number(v)),
        }

        const result = await Database.levelRepository.search(searchOptions);

        return json(result);
    } catch (error) {
        console.error(error);
        return json({ error: "Error parsing arguments" });
    }

}