
// import * as nbt from "prismarine-nbt";
// import * as nbt from "nbt";
import { getTagType, NBTData, read, TAG, type CompoundTag, type ListTag, type RootTag, type StringTag, type Tag } from "nbtify";

export interface LevelInNBT extends CompoundTag {
    data: {
        author: StringTag,
        name: StringTag,
        info?: StringTag,
    }
}

export async function readNBTFile(file: File): Promise<NBTData<RootTag>> {
    const buffer = await file.arrayBuffer();
    const data = await read(buffer);
    return data;
}

export function findLevelsInHotbar(data: NBTData<RootTag>): LevelInNBT[] {
    const foundLevels: LevelInNBT[] = [];
    const rootData = data.data as CompoundTag;
    for (const obj in rootData) {
        // all the saved hotbars & other data (version number)
        const hotbar = (<CompoundTag>data.data)[obj]!;
        if (getTagType(hotbar) !== TAG.LIST) continue;

        for (const item of hotbar as ListTag<Tag>) {
            // all the items inside one hotbar
            if (getTagType(item) !== TAG.COMPOUND)
                continue;

            const components = <CompoundTag>(<CompoundTag>item).components;
            if (!components)
                continue;

            const customData = <CompoundTag>components["minecraft:custom_data"];
            if (!customData || !customData.level)
                continue;
            const levelData = <CompoundTag>customData.level;
            if (!levelData.level || !levelData.data || !levelData.game_version)
                continue;
            foundLevels.push(<LevelInNBT>levelData);
        }

    }

    return foundLevels;
}

export function findLevelsInStorageDat(data: NBTData<RootTag>): LevelInNBT[] {
    const foundLevels: LevelInNBT[] = [];
    const contents = (<CompoundTag>(<CompoundTag>(<CompoundTag>data.data).data).contents);
    if (!contents) return [];
    foundLevels.push(...findLevelsInNBTRecursively(contents));

    console.log({ contents, foundLevels });
    return foundLevels;
}

function findLevelsInNBTRecursively(data: Tag): LevelInNBT[] {
    const foundLevels: LevelInNBT[] = [];
    const tagType = getTagType(data);
    if (tagType === TAG.COMPOUND) {
        const compData = <CompoundTag>data;
        if (compData.level && compData.data && compData.game_version) {
            if (!(<CompoundTag>compData.data).builtin)
                return [<LevelInNBT>compData];
            else 
                return [];
        }

        for (const name in compData) {
            const nested = (compData)[name]!;
            foundLevels.push(...findLevelsInNBTRecursively(nested));
        }
    }
    if (tagType === TAG.LIST) {
        for (const nested of <ListTag<Tag>>data) {
            foundLevels.push(...findLevelsInNBTRecursively(nested));
        }
    }

    return foundLevels;
}