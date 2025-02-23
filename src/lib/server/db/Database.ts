import { env } from "$env/dynamic/private";
import { MongoClient } from "mongodb";
import { LevelRepository } from "./repositories/LevelRepository";
import { SessionRepository } from "./repositories/SessionRepository";
import { UserRepository } from "./repositories/UserRepository";
import { CounterRepository } from "./repositories/CounterRepository";
import { EmailVerificationRepository } from "./repositories/EmailVerificationRepository";



export default class Database {
    private static client = new MongoClient(env.DB_URL);
    private static db = this.client.db(env.DB_NAME);
    static readonly levelRepository: LevelRepository = new LevelRepository(this.db.collection("levels"));
    static readonly sessionRepository: SessionRepository = new SessionRepository(this.db.collection("sessions"));
    static readonly userRepository: UserRepository = new UserRepository(this.db.collection("users"));
    static readonly counterRepository: CounterRepository = new CounterRepository(this.db.collection("counter"));
    static readonly emailVerificationRepository: EmailVerificationRepository = new EmailVerificationRepository(this.db.collection("emailVerifications"));

    static async connect() {
        await this.client.connect();
        console.info("Database connected");
    }
    static async close() {
        await this.client.close();
    }
}
