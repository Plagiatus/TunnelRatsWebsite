// import { stringify, type CompoundTag, type IntTag, type ListTag, type StringTag, type Tag } from "nbtify";
// import type { Level } from "./main";

// export function importLevelV1(data: CompoundTag): Level {
//     console.log(stringify(data, {space: 4}));
//     const level = data.level as CompoundTag;

//     return {

//         name: (<StringTag>data.name)?.valueOf(),
//         version: (<IntTag>data.version)?.valueOf(),
//         level: {
//             sections: (<ListTag<Tag>>level.sections),
//             width: (<IntTag>level.totalX)?.valueOf(),
//         }
//     }
// }