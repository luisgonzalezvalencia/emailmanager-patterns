import { EmailLeaf } from '../../CarpetaComposite/EmailLeaf';

export interface MailResponseStrategy{
    fechaenvio: string;
    estado: boolean;
}

export interface MailStrategy{
    sendMail(mail: EmailLeaf): MailResponseStrategy;
}