import { EmailLeaf } from "./CarpetaComposite/EmailLeaf";
import { CarpetaComposite } from "./CarpetaComposite/CarpetaComposite";
import { EmailComponent } from "./CarpetaComposite/EmailComponent";

export class EmailManager {
    public BandejaEnviados: CarpetaComposite;
    public BandejaEntrada: CarpetaComposite;

    constructor() {
        this.BandejaEnviados = new CarpetaComposite("Bandeja de Enviados", 1);
        this.BandejaEntrada = new CarpetaComposite("Bandeja de Entrada", 2);
    }

    public Enviar(email: EmailLeaf): boolean {
        //si tenemos todos los datos, agregamos el mail a bandeja de enviados
        if (email.Asunto != "" && email.Contenido != "" && email.Para.length > 0 && email.Remitente != null) {
            this.BandejaEnviados.Add(email);
            return true;
        }
        //si no ingresa en el if, devolvemos false
        return false;
    }


    public Buscar(param: string): Array<EmailComponent> {
       return this.BandejaEnviados.Search(param);
    }

}