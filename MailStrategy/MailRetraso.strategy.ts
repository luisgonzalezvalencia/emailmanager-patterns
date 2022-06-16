import { EmailComponent } from "../CarpetaComposite/EmailComponent";
import { MailResponseStrategy, MailStrategy } from "./interfaces/MailStrategy.interface";

export class MailConRetrasoStrategy implements MailStrategy {
    sendMail(mail: EmailComponent): MailResponseStrategy {
        throw new Error("Method not implemented.");
    }
}