export abstract class EmailComponent {
    public Asunto: string = "";
    public Contenido: string = "";

    constructor(asunto: string, contenido: string) {
        this.Asunto = asunto;
        this.Contenido = contenido;
    }
}