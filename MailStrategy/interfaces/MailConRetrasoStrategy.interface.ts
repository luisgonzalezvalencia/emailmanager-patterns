import { MailStrategy } from "./MailStrategy.interface";

export interface MailConRetrasoStrategy extends MailStrategy{
    fechaEnvio: string; //los parametros adicionales que tendra los mails que se envian con retraso
}