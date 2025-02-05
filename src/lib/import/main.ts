import type { CompoundTag, IntTag } from "nbtify";
import { importLevelV1 } from "./v1";

export interface LevelToDisplay {
    name: string,
    version: number,
    level: LevelData,
}

interface LevelData {
    width: number,
    sections: number,
}

export function importLevel(data: CompoundTag): LevelToDisplay | undefined {
    const version: IntTag | undefined = <IntTag>data.version;
    if (!version) return importLevelV0(data);
    switch (version.valueOf()) {
        case 1:
            return importLevelV1(data);
    }
}

function importLevelV0(data: CompoundTag): LevelToDisplay | undefined {
    console.log(data);

    return;
}