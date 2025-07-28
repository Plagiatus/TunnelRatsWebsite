import type { Collection, Filter, FindOptions, InsertOneResult, OptionalId, Sort } from "mongodb";
import { Repository } from "./Repository";

export enum LevelStatus {
    PENDING = "pending",
    APPROVED = "approved",
    HIDDEN = "hidden",
    REMOVED = "removed",
}

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
    status?: LevelStatus,
}

export type LevelVersion = {
    downloads: number,
    name: string,
    version: string,
    gameVersion: number,
    raw: string,
    published: Date,
}

export interface LevelSearchOptions {
    search: string,
    versions: number[],
    tags: string[],
    sort: Sort,
    skip: number,
    limit: number,
    random: boolean,
}

export class LevelRepository extends Repository<LevelInDB, "id"> {
    public constructor(collection: Collection<LevelInDB>) {
        super(collection, "id");
        collection.createIndex([{ title: "text" }, { description: "text" }, { author: "text" }]);
        collection.createIndex({ status: 1 });
    }

    public async search(searchOptions: LevelSearchOptions): Promise<LevelInDB[]> {
        // TODO: make search, versions, tags, random actually do something
        const options: FindOptions = {
            sort: searchOptions.sort,
            skip: searchOptions.skip,
            limit: Math.min(50, searchOptions.limit),

            projection: { _id: 0 },
        }

        const filter: Filter<LevelInDB> = {};

        if (searchOptions.search) {
            filter.$text = { $search: searchOptions.search }
        }

        return this.collection.find(filter, options).toArray();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // const pipeline: any[] = []
        // if (searchOptions.search) pipeline.push({
        //     $or: [
        //         {$text: {$sear}}
        //     ]
        // })
        // if (searchOptions.random) pipeline.push({ $sample: { size: searchOptions.limit } })


        // pipeline.push({ $project: { _id: 0, versions: 0 } });
        // this.collection.aggregate(pipeline, options);
    }

    public async add(document: OptionalId<LevelInDB>): Promise<InsertOneResult<LevelInDB>> {
        if (!document.id) {
            document.id = await this.getUnusedId();
        }
        return super.add(document);
    }

    public async getUnusedId(): Promise<string> {
        const options: string[] = "abcdefghijklmnopqrstuvwxyz0123456789".split("");
        let id: string = "";
        do {
            id = Array.from(Array(6), () => options[Math.floor(Math.random() * options.length)]).join("");
        } while (await this.get(id));
        return id;
    }
}