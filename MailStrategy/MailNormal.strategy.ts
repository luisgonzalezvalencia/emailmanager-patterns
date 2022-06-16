import { EmailLeaf } from "../CarpetaComposite/EmailLeaf";
import { MailResponseStrategy, MailStrategy } from "./interfaces/MailStrategy.interface";

export class MailNormalStrategy implements MailStrategy {
    sendMail(email: EmailLeaf): MailResponseStrategy {
        //la estrategia normal es enviar el mail y marcarlo como enviado
        email.setEmailEnviado();
        return { 
            fechaenvio: email.getFechaEnvio(),
            estado: email.getEstado()
        }
    }
}