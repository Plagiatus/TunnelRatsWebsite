import type { Collection } from "mongodb";
import { Repository } from "./Repository";
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { expireIn } from "$lib/utils";

export type Session = {
    id: string,
    userId: number,
    expiresAt: Date,
}

export class SessionRepository extends Repository<Session, "id"> {
    public constructor(collection: Collection<Session>) {
        super(collection, "id");
        collection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
    }

    generateSessionToken(): string {
        const bytes = new Uint8Array(20);
        crypto.getRandomValues(bytes);
        const token = encodeBase32LowerCaseNoPadding(bytes);
        return token;
    }

    async createSession(token: string, userId: number): Promise<Session> {
        const sessionId = this.getSessionIdFromToken(token);
        const session: Session = {
            id: sessionId,
            userId,
            expiresAt: expireIn({days: 30})
        };

        await this.collection.insertOne(session);
        return session;
    }

    async validateSessionToken(token: string): Promise<Session | undefined> {
        const sessionId = this.getSessionIdFromToken(token);
        const sessionInDb = await this.get(sessionId);
        if (!sessionInDb) return;
        if (Date.now() >= sessionInDb.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
            sessionInDb.expiresAt = expireIn({days: 30});
            this.collection.updateOne({ id: sessionInDb.id }, sessionInDb);
        }
        return sessionInDb;
    }

    async invalidateSession(sessionId: string): Promise<void> {
        this.collection.deleteOne({ id: sessionId });
    }

    private getSessionIdFromToken(token: string): string {
        return encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    }
}