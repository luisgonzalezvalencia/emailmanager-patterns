export class Calendario {
    //instancia privada para manejar el singleton internamente
    private static instance: Calendario;

    //el constructor debe estar privado para no permitir generar instancia de la clase
    private constructor() {

    }

    //el metodo estatico permite acceder a la instancia sin necesidad de instanciarla
    public static getInstance(): Calendario {
        //si la instancia no existe, la creamos
        if (!Calendario.instance) {
            Calendario.instance = new Calendario();
        }
        //devolvemos la instancia de la clase
        return Calendario.instance;
    }


    //generamos los getters publicos que puden devolver valores de atributos privados o lógica (como en este caso)

    public getFecha(): string {
        let fecha = new Date();
        let dia = fecha.getDate();
        let mes = fecha.getMonth() + 1;
        let anio = fecha.getFullYear();

        return dia + "/" + mes + "/" + anio;
    }

    public getHora(): string {
        let fecha = new Date();
        let hora = fecha.getHours();
        let minutos = fecha.getMinutes();
        let segundos = fecha.getSeconds();

        return hora + ":" + minutos + ":" + segundos;
    }

    public getFechaHora(): string {
        return this.getFecha() + " " + this.getHora();
    }

    public getFechaHoraFormato(formato: string): string {
        let fecha = new Date();
        let dia = fecha.getDate();
        let mes = fecha.getMonth() + 1;
        let anio = fecha.getFullYear();
        let hora = fecha.getHours();
        let minutos = fecha.getMinutes();
        let segundos = fecha.getSeconds();

        return formato.replace("dd", dia.toString()).replace("mm", mes.toString()).replace("yyyy", anio.toString()).replace("hh", hora.toString()).replace("mm", minutos.toString()).replace("ss", segundos.toString());
    }

}