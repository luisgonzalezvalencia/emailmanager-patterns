import { IMailStrategy } from "./MailStrategy.interface";

export interface IMailConRetrasoStrategy extends IMailStrategy{
    fechaEnvio: string; //los parametros adicionales que tendra los mails que se envian con retraso
}