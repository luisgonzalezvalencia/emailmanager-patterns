import { EmailLeaf } from "./CarpetaComposite/EmailLeaf";
import { CarpetaComposite } from "./CarpetaComposite/CarpetaComposite";
import { EmailComponent } from "./CarpetaComposite/EmailComponent";

export class EmailManager {
    private static instance: EmailManager;
    public BandejaEnviados: CarpetaComposite;
    public BandejaEntrada: CarpetaComposite;

    private constructor() {
        //email manager la primera vez quee se instancia crea las carpetas de salida y entrada para el cliente
        this.BandejaEnviados = new CarpetaComposite("Bandeja de Enviados", 1);
        this.BandejaEntrada = new CarpetaComposite("Bandeja de Entrada", 2);
    }

     //el metodo estatico permite acceder a la instancia sin necesidad de instanciarla
     public static getInstance(): EmailManager {
        //si la instancia no existe, la creamos
        if (!EmailManager.instance) {
            EmailManager.instance = new EmailManager();
        }
        //devolvemos la instancia de la clase
        return EmailManager.instance;
    }

    public Enviar(email: EmailLeaf): boolean {
        //si tenemos todos los datos, agregamos el mail a bandeja de enviados
        if (email.Asunto != "" && email.Contenido != "" && email.Para.length > 0 && email.Remitente != null) {
            this.BandejaEnviados.Add(email);
            email.setEmailEnviado();
            return true;
        }
        //si no ingresa en el if, devolvemos false
        return false;
    }


    public BuscarEnEnviados(param: string): Array<EmailComponent> {
        return this.BandejaEnviados.Search(param);
    }

    public BuscarEnRecibidos(param: string): Array<EmailComponent> {
        return this.BandejaEntrada.Search(param);
    }

}