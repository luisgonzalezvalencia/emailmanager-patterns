import { Contacto } from './contacto';

export class Email {

    public Asunto: string = "";
    public Contenido: string ="";
    public Remitente: Contacto = null;
    public Para: Array<Contacto> = [];

}