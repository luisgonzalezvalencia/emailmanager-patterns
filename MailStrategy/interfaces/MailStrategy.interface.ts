import { EmailLeaf } from '../../CarpetaComposite/EmailLeaf';

export interface IMailResponseStrategy{
    fechaenvio: string;
    estado: boolean;
}

export interface IMailStrategy{
    sendMail(mail: EmailLeaf): IMailResponseStrategy;
}