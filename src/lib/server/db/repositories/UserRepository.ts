import type { Collection } from "mongodb";
import { Repository } from "./Repository";
import Database from "../Database";
import { hashPassword } from "$lib/server/auth/password";

export type User = {
    id: number,
    username: string,
    email: string,
    emailVerified: boolean,
    passwordHash: string,
    joinedOn: Date,
    levels: string[],
    likes: string[],
}

export class UserRepository extends Repository<User, "id"> {
    public constructor(collection: Collection<User>) {
        super(collection, "id");
    }

    public async getUserByName(username: string): Promise<User | null> {
        return this.collection.findOne({ username }, { projection: { _id: 0 } })
    }
    public async getUserByEmail(email: string): Promise<User | null> {
        return this.collection.findOne({ email }, { projection: { _id: 0 } })
    }
    public async createNewUser(username: string, email: string, password: string): Promise<User> {
        const id = await Database.counterRepository.getNextNumber("users");
        const passwordHash = await hashPassword(password);
        const user: User = { email, emailVerified: false, id, username, passwordHash, joinedOn: new Date(), levels: [], likes: [] };
        this.add(user);
        return user;
    }
    public async setVerifiedEmail(id: number, email: string) {
        return this.collection.updateOne({ id }, { $set: { email, emailVerified: true } });
    }
}