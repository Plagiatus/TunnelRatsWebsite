// import type { CompoundTag, IntTag } from "nbtify";
// import { importLevelV1 } from "./v1";

export interface Level {
    game_version: number,
    level: LevelLevelData,
    data: LevelData,
    settings?: LevelSettings,
}

interface LevelLevelData {
    totalX: number,
    sections: LevelSection[],
}

interface LevelSection {
    x: number,
    y: number,
    z: number,
    blocks: LevelBlock[],
}

interface LevelSettings {
    something: string,
}

interface LevelBlock {
    id: string,
    nbt: string | object,
    p?: number,
}

interface LevelData {
    name: string,
    author: string,
    info?: string,
    locked?: boolean,
    builtin?: boolean,
    imported?: boolean,
    namespace?: string,
}

// export function importLevel(data: CompoundTag): LevelToDisplay | undefined {
//     const version: IntTag | undefined = <IntTag>data.version;
//     if (!version) return importLevelV0(data);
//     switch (version.valueOf()) {
//         case 1:
//             return importLevelV1(data);
//     }
// }

// function importLevelV0(data: CompoundTag): LevelToDisplay | undefined {
//     console.log(data);

//     return;
// }