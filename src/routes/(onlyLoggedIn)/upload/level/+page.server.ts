import { failWithErrorAndData } from "$lib/utils";
import { parse } from "nbtify";
import type { Action, Actions } from "./$types";
import type { LevelInNBT } from "$lib/nbtReader";
import { LevelStatus, type LevelInDB } from "$lib/server/db/repositories/LevelRepository";
import Database from "$lib/server/db/Database";

const saveNewLevelAction: Action = async (event) => {
    if (!event.locals.user) return failWithErrorAndData(404, "You're not logged in anymore.");
    const data = await event.request.formData();
    const name = data.get("name");
    const author = data.get("author");
    const info = data.get("info");
    const datapackLink = data.get("dp-link");
    const levelData = data.get("levelData");
    const imageFile = data.get("image");
    const version = data.get("version");

    if (!levelData || typeof levelData !== "string") return failWithErrorAndData(400, "Level data wasn't sent. Please try starting over.");
    let parsedLevelData: LevelInNBT;
    try {
        parsedLevelData = parse(levelData);
    } catch (error) {
        console.error(error);
        return failWithErrorAndData(400, "Something went wrong with parsing your level data. Please start over.");
    }
    if (!parsedLevelData.game_version || !parsedLevelData.data || !parsedLevelData.level) {
        return failWithErrorAndData(400, "Your level data is missing essential components. Please ensure you're uploading actual levels you exported from the game.");
    }

    if (!name || typeof name !== "string") return failWithErrorAndData(400, "Level name invalid or missing.");
    if (name.length < 3 || name.length > 32) return failWithErrorAndData(400, "Level name must be between 3 and 32 characters.")
    if (!author || typeof author !== "string") return failWithErrorAndData(400, "Author name invalid or missing.");
    if (author.length < 3 || author.length > 32) return failWithErrorAndData(400, "Author name(s) must be between 3 and 32 characters.")
    if (!version || typeof version !== "string") return failWithErrorAndData(400, "Version invalid or missing.");
    if (version.length > 24) return failWithErrorAndData(400, "Versions cannot be more than 24 characters.")
    if (!info || typeof info !== "string") return failWithErrorAndData(400, "Level info invalid or missing.");
    if (info.length < 10) return failWithErrorAndData(400, "You need to provide some info on your map (at least 10 characters).");
    if (info.length > 1024) return failWithErrorAndData(400, "Your description can at most be 1024 characters.");

    if (parsedLevelData.data.namespace) {
        if ((!datapackLink || typeof datapackLink !== "string"))
            return failWithErrorAndData(400, "Level uses namespace feature to link a datapack. You failed to include a datapack link.");
        if (!(datapackLink.startsWith("http://") || datapackLink.startsWith("https://")) || datapackLink.length > 15)
            return failWithErrorAndData(400, "Invalid datapack link.")
    }

    const newLevel: LevelInDB = {
        author,
        description: info,
        downloads: 0,
        id: "",
        image: "",
        likes: 0,
        owner: event.locals.user.id,
        tags: [],
        title: name,
        status: LevelStatus.PENDING,
        versions: [
            {
                downloads: 0,
                gameVersion: parsedLevelData.game_version.valueOf(),
                name: name,
                published: new Date(),
                raw: levelData,
                version,
            }
        ]
    }

    if (imageFile) {
        if (!(imageFile instanceof File)) {
            return failWithErrorAndData(400, "Invalid image field.")
        }
        const reader = new FileReader();
        await new Promise((resolve) => {
            reader.addEventListener("load", async (data) => {
                if (data && data.target && data.target.result) {
                    newLevel.image = data.target.result as string;
                }
                resolve(data);
            });
            reader.readAsDataURL(imageFile);
        });
    }

    await Database.levelRepository.add(newLevel);

    return failWithErrorAndData(404, "aaaa");
}


export const actions: Actions = {
    default: saveNewLevelAction,
}

