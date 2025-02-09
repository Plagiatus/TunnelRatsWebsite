import * as Mongo from "mongodb";

export class Repository<TDocument extends Mongo.Document, TId extends keyof TDocument> {
    constructor(protected readonly collection: Mongo.Collection<TDocument>, protected readonly idField: TId) {
        if (idField) {
            const indexSpecification: Mongo.IndexSpecification = {};
            indexSpecification[String(idField)] = 1;
            collection.createIndex(indexSpecification, { unique: true });
        }
    }

    public get(id: TDocument[TId]): Promise<TDocument | null> {
        return <Promise<TDocument | null>>this.collection.findOne(this.getQueryForDocument(id), { projection: { _id: 0 } });
    }

    public getMultiple(query: Mongo.Filter<TDocument>, limit: number, skip: number = 0, sort?: Mongo.Sort): Promise<TDocument[]> {
        return (<Mongo.FindCursor<TDocument>>this.collection.find(query, { projection: { _id: 0 }, skip, limit, sort })).toArray();
    }

    public add(document: Mongo.OptionalUnlessRequiredId<TDocument>) {
        return this.collection.insertOne(document);
    }

    public remove(documentOrId: TDocument | TDocument[TId]) {
        return this.collection.deleteOne(this.getQueryForDocument(documentOrId));
    }

    protected getQueryForDocument(documentOrId: TDocument | TDocument[TId]): Mongo.Filter<TDocument> {
        const id = this.getId(documentOrId);
        const query: Partial<TDocument> = {};
        query[this.idField] = <TDocument[TId]>id;

        return query as Mongo.Filter<TDocument>;
    }

    protected getId(documentOrId: TDocument | TDocument[TId]): TId {
        let id: TId;
        if (documentOrId && typeof documentOrId === "object") {
            id = documentOrId[this.idField];
        } else {
            id = documentOrId;
        }
        return id;
    }
}