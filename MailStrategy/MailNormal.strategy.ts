import { EmailLeaf } from "../CarpetaComposite/EmailLeaf";
import { IMailResponseStrategy, IMailStrategy } from "./interfaces/MailStrategy.interface";

export class MailNormalStrategy implements IMailStrategy {
    sendMail(email: EmailLeaf): IMailResponseStrategy {
        //la estrategia normal es enviar el mail y marcarlo como enviado
        email.setEmailEnviado();
        return { 
            fechaenvio: email.getFechaEnvio(),
            estado: email.getEstado()
        }
    }
}