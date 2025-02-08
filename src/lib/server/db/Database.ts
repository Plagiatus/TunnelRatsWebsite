import { DB_URL, DB_NAME } from "$env/static/private";
import { MongoClient } from "mongodb";
import { LevelRepository } from "./repositories/LevelRepository";



export default class Database {
    private static client = new MongoClient(DB_URL);
    private static db = this.client.db(DB_NAME);
    static readonly levelRepository: LevelRepository = new LevelRepository(this.db.collection("levels"));

    static async connect() {
        await this.client.connect();
    }
    static async close() {
        await this.client.close();
    }
}
