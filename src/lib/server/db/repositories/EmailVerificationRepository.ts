import type { Collection } from "mongodb";
import { Repository } from "./Repository";
import { encodeBase32LowerCaseNoPadding } from "@oslojs/encoding";
import { createRandomOTP } from "$lib/server/auth/password";
import { expireIn } from "$lib/utils";

interface EmailVerification {
    id: string,
    userId: number,
    code: string,
    email: string,
    expiresAt: Date,
}

export class EmailVerificationRepository extends Repository<EmailVerification, "id"> {
    public constructor(collection: Collection<EmailVerification>) {
        super(collection, "id");
        collection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
    }


    async createEmailVerificationRequest(userId: number, email: string): Promise<EmailVerification>{
        this.removeEmailVerificationRequest(userId);
        const idBytes = new Uint8Array(20);
        crypto.getRandomValues(idBytes);
        const id = encodeBase32LowerCaseNoPadding(idBytes);

        const code = createRandomOTP(5);
        const expiresAt = expireIn({minutes: 10});

        const verification: EmailVerification = {
            code, 
            email, 
            expiresAt, 
            id,
            userId
        }

        await this.add(verification);

        return verification;
    }

    async removeEmailVerificationRequest(userId: number): Promise<void> {
        await this.collection.deleteOne({userId});
    }
}