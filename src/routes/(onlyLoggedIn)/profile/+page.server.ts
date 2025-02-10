import Mail, { MAIL_TEMPLATE } from "$lib/server/mail/mail";
import type { Action, Actions } from "./$types";

const sendMailAction: Action = ({params}) => {
    console.log("send mail", params);
    Mail.sendMail({to: "l.s.01@web.de", ...Mail.getMailTemplate(MAIL_TEMPLATE.CONFIRM_EMAIL), replace: [["%LINK%", "https://tunnelrats.net"]]});
}

export const actions: Actions = {
    sendmail: sendMailAction,
}