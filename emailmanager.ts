import { EmailLeaf } from "./CarpetaComposite/EmailLeaf";
import { CarpetaComposite } from "./CarpetaComposite/CarpetaComposite";
import { EmailComponent } from "./CarpetaComposite/EmailComponent";
import { IMailStrategy, IMailResponseStrategy } from "./MailStrategy/interfaces/MailStrategy.interface";
import { MailNormalStrategy } from "./MailStrategy/MailNormal.strategy";
import { TaskManager } from "./TaskManager";
import { Calendario } from "./CalendarioSingleton/Calendario";

export class EmailManager {

    private static instance: EmailManager;
    public BandejaEnviados: CarpetaComposite;
    public BandejaEntrada: CarpetaComposite;
    private context?: IMailStrategy;        //por default si no tenemos el contexto, usamos el envio normal

    private constructor() {
        //email manager la primera vez quee se instancia crea las carpetas de salida y entrada para el cliente, y la estrategia por default
        this.BandejaEnviados = new CarpetaComposite("Bandeja de Enviados", 1);
        this.BandejaEntrada = new CarpetaComposite("Bandeja de Entrada", 2);
        this.context = new MailNormalStrategy();
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

    //seteo la estrategia a utilizar
    public setStrategy(strategy: IMailStrategy) {
        this.context = strategy;
    }

    public Enviar(email: EmailLeaf): boolean {
        //si tenemos todos los datos, agregamos el mail a bandeja de enviados
        if (email.Asunto != "" && email.Contenido != "" && email.Para.length > 0 && email.Remitente != null) {

            //guardamos la respuesta del envio
            let respuesta = this.context.sendMail(email);

            //en caso de tener una estrategia con retraso, queda en  cola de tareas
            //si se envio, añadimos a bandeja de enviados
            if (respuesta.estado) {
                this.BandejaEnviados.Add(email);
            }
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

    public ProcesarListaTareas() {
        let taskManager = TaskManager.getInstance();
        let listaEnviar: EmailLeaf[] = [];
        taskManager.getTask().forEach(task => {
            if (task.getFechaEnvio() == Calendario.getInstance().getFecha()) {
                listaEnviar.push(task);
            }
        });

        listaEnviar.forEach(task => {
            taskManager.DeleteTask(task);
            this.setStrategy(new MailNormalStrategy());
            this.Enviar(task);
        });

        return listaEnviar.length;
    }

}