import type { Collection } from "mongodb";
import { Repository } from "./Repository";
import { encodeBase32LowerCaseNoPadding } from "@oslojs/encoding";
import { createRandomOTP } from "$lib/server/auth/password";
import { expireIn } from "$lib/utils";
import Mail, { MAIL_TEMPLATE, type MailSendOptions } from "$lib/server/mail/mail";

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


    async createEmailVerificationRequest(userId: number, email: string): Promise<EmailVerification> {
        this.removeEmailVerificationRequest(userId);
        const idBytes = new Uint8Array(20);
        crypto.getRandomValues(idBytes);
        const id = encodeBase32LowerCaseNoPadding(idBytes);

        const code = createRandomOTP(5);
        const expiresAt = expireIn({ minutes: 10 });

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

    async sendEmail(verification: EmailVerification): Promise<void> {
        const opt: MailSendOptions = {
            ...Mail.getMailTemplate(MAIL_TEMPLATE.CONFIRM_EMAIL),
            to: verification.email,
            replace: [
                ["%LINK%", `https://tunnelrats.net/verify-email?token=${verification.id}`],
                ["%CODE%", verification.code],
            ],
        }
        Mail.sendMail(opt);
    }

    async removeEmailVerificationRequest(userId: number): Promise<void> {
        await this.collection.deleteOne({ userId });
    }
    async getForUser(userId: number): Promise<EmailVerification | null> {
        return this.collection.findOne({ userId }, {projection: {_id: 0}});
    }
    async getViaCode(code: string): Promise<EmailVerification | null> {
        return this.collection.findOne({ code }, {projection: {_id: 0}});
    }
}