import type { Collection } from "mongodb";
import { Repository } from "./Repository";

interface Counting {
    id: string,
    current: number,
}

export class CounterRepository extends Repository<Counting, "id"> {
    public constructor(collection: Collection<Counting>) {
        super(collection, "id");
    }

    public async getNextNumber(id: string): Promise<number> {
        const document = await this.collection.findOneAndUpdate({ id }, {
            $inc: { current: 1 }
        }, { upsert: true });
        if (!document) return 0;
        return document.current;
    }
}