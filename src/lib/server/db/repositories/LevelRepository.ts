import type { Collection } from "mongodb";
import { Repository } from "./Repository";

export type LevelInDB = {
    id: string,
    title: string,
    description: string,
    image: string,
    author: string,
    versions: LevelVersion[],
    downloads: number,
    likes: number,
    tags: string[],
    owner: number,
}

export type LevelVersion = {
    name: string,
    version: string,
    gameVersion: number,
    raw: string,
    date: Date,
}

export class LevelRepository extends Repository<LevelInDB, "id"> {
    public constructor(collection: Collection<LevelInDB>) {
        super(collection, "id");
    }
}