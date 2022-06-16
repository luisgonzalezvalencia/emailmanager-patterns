import { EmailLeaf } from "../CarpetaComposite/EmailLeaf";
import { IMailConRetrasoStrategy } from "./interfaces/MailConRetrasoStrategy.interface";
import { IMailResponseStrategy } from "./interfaces/MailStrategy.interface";
import { TaskManager } from "../TaskManager";

export class MailRetrasoStrategy implements IMailConRetrasoStrategy {
    fechaEnvio: string;

    sendMail(email: EmailLeaf): IMailResponseStrategy {
        email.setFechaEnvio(this.fechaEnvio);
        //añadimos el mail a la cola de trabajos pendientes
        TaskManager.getInstance().AddTask(email);
        return {
            fechaenvio: email.getFechaEnvio(),
            estado: email.getEstado()
        }
    }
}