import { sha1 } from "@oslojs/crypto/sha1";
import { encodeHexLowerCase } from "@oslojs/encoding";
import * as bcrypt from "bcrypt";

const saltRounds = 10;

export async function hashPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
}

export async function isPasswordValid(plaintextPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plaintextPassword, hashedPassword);
}

export async function getPasswordValidationError(password: string): Promise<string> {
    if (password.length < 8 || password.length > 255) return "Your password needs to be between 8 to 255 characters.";

    const hash = encodeHexLowerCase(sha1(new TextEncoder().encode(password)));
    const hashPrefix = hash.slice(0, 5);
    const response = await fetch(`https://api.pwnedpasswords.com/range/${hashPrefix}`);
    const data = await response.text();
    const items = data.split("\r\n");
    for(const item of items) {
        const hashSuffix = item.slice(0, 35).toLowerCase();
        if(hash === hashPrefix + hashSuffix){
            return `This password has been leaked on the internet ${item.slice(36)} times and is thus insecure (see <a href="https://haveibeenpwned.com/Passwords">haveibeenpwned.com</a>). Please use a different one.`;
        }
    }
    return "";
}