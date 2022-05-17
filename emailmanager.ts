import { Email } from "./email";

export class EmailManager {
    public BandejaEnviados: Array<Email> = [];
    public BandejaEntrada: Array<Email> = [];

    public Enviar(email: Email): boolean {
        //si tenemos todos los datos, agregamos el mail a bandeja de enviados
        if (email.Asunto != "" && email.Contenido != "" && email.Para.length > 0 && email.Remitente != null) {
            this.BandejaEnviados.push(email);
            return true;
        }
        //si no ingresa en el if, devolvemos false
        return false;
    }


    public Buscar(string): Array<Email> {
        return [];
    }

}