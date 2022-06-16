export abstract class EmailComponent {
    setEmailEnviado() {
        throw new Error("Method not implemented.");
    }
    public Asunto: string = "";
    public Contenido: string = "";

    constructor(asunto: string, contenido: string) {
        this.Asunto = asunto;
        this.Contenido = contenido;
    }
}