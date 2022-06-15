import { Calendario } from '../CalendarioSingleton/Calendario';
import { Contacto } from './../contacto';
import { EmailComponent } from './EmailComponent';

export class EmailLeaf extends EmailComponent {


    public Remitente: Contacto = null;
    public Para: Array<Contacto> = [];
    private FechaEnvio: string;
    private FechaLeido: string;
    private Estado: boolean = false;
    private Leido: boolean = false;

    constructor(asunto: string, contenido: string, remitente: Contacto, para: Array<Contacto>) {
        super(asunto, contenido);
        this.Remitente = remitente;
        this.Para = para;
    }



    setEmailEnviado() {
        this.Estado = true;
        this.FechaEnvio = Calendario.getInstance().getFecha();
    }

    SetEmailAbierto() {
        this.Leido = true;
        this.FechaLeido = Calendario.getInstance().getFecha();
    }

    getFechaEnvio(): any {
        return this.FechaEnvio;
    }

    getFechaLeido(): any {
        return this.FechaEnvio;
    }

}