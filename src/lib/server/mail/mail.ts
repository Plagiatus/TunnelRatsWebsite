import { MAIL_PASSWORD, MAIL_PORT, MAIL_SERVER, MAIL_USERNAME } from "$env/static/private";
import * as nodemailer from "nodemailer";

import baseHTML from "./templates/base.html?raw";
import baseText from "./templates/base.txt?raw";
import emailConfirmationHTML from "./templates/confirm_email.html?raw";
import emailConfirmationText from "./templates/confirm_email.txt?raw";

export enum MAIL_TEMPLATE {
    CONFIRM_EMAIL
}
export default class Mail {
    private static readyToSend: boolean = false;
    private static transporter: nodemailer.Transporter = nodemailer.createTransport({
        //@ts-expect-error host and port aren't recognized for some reason
        host: MAIL_SERVER,
        port: MAIL_PORT,
        secure: true,
        auth: {
            user: MAIL_USERNAME,
            pass: MAIL_PASSWORD,
        },
    });

    private static templates: Map<MAIL_TEMPLATE, MailTemplate> = new Map<MAIL_TEMPLATE, MailTemplate>([
        [MAIL_TEMPLATE.CONFIRM_EMAIL, { text: emailConfirmationText, html: emailConfirmationHTML, subject: "Confirm your Email" }]
    ]);

    public static async verify() {
        try {
            await this.transporter.verify();
            console.info("Mail server ready to send mail");
            this.readyToSend = true;
        } catch (error) {
            this.readyToSend = false;
            console.error(error);
        }
    }

    public static async sendMail(options: MailSendOptions) {
        if (!options) return;
        const opt: Required<MailSendOptions> = { ...this.getDefaultOptions(), ...options };
        opt.html = baseHTML.replaceAll("%CONTENT%", opt.html);
        opt.text = baseText.replaceAll("%CONTENT%", opt.text);
        for(const r of opt.replace) {
            opt.html = opt.html.replaceAll(r[0], r[1]);
            opt.text = opt.text.replaceAll(r[0], r[1]);
            opt.subject = opt.subject.replaceAll(r[0], r[1]);
        }
        try {
            await this.transporter.sendMail(opt);
        } catch (error) {
            console.error(error);
        }
    }


    public static getMailTemplate(template: MAIL_TEMPLATE): MailTemplate {
        return this.templates.get(template) ?? {html: "", subject: "", text: ""};
    }

    private static getDefaultOptions(): Required<MailSendOptions> {
        return {
            from: "noreply@plagiatus.net",
            to: "",
            html: "", subject: "", text: "",
            replyTo: "contact@plagiatus.net",
            replace: [],
        }
    }
}

interface MailTemplate {
    text: string,
    html: string,
    subject: string,
}

export interface MailSendOptions extends MailTemplate {
    to: string,
    from?: string,
    replyTo?: string,
    replace?: [string, string][];
}