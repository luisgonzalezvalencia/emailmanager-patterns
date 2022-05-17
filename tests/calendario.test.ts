import { Calendario } from "../CalendarioSingleton/Calendario";

//asignamos la constante calendario global a una instancia de la clase calendario
const calendario = Calendario.getInstance();

//este primer test es para verificar que, sin realizar una instancia de la clase externamente,
//la clase calendario maneja su instancia internamente. Si no existe la genera, y si ya existe, la devuelve.
test('El objeto no debe ser nulo', () => {
    expect(calendario !== null).toBeTruthy();
})


//este segundo test es para verificar que, al asignar a distintas variables la misma instancia, ellas son iguales.
// es decir, apuntan a la misma instancia (direccion de memoria) de la clase Calendario, y con ello se asegura que el singleton está funcionando.
test('Las variables del objeto deben ser iguales', () => {
    let calendario2 = Calendario.getInstance();
    expect(calendario === calendario2).toBeTruthy();
})


//cubrimos los métodos del singleton

test('La fecha debe ser la correcta en formato dia/mes/anio', () => {
    let fecha = new Date();
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1;
    let anio = fecha.getFullYear();
    let fechaStr = dia + "/" + mes + "/" + anio;
    expect(calendario.getFecha()).toBe(fechaStr);
})

test('La hora debe ser la correcta en formato hora:minutos:segundos', () => {
    let fecha = new Date();
    let hora = fecha.getHours();
    let minutos = fecha.getMinutes();
    let segundos = fecha.getSeconds();
    let horaStr = hora + ":" + minutos + ":" + segundos;
    expect(calendario.getHora()).toBe(horaStr);
})


test('La fecha y hora debe ser la correcta en formato dia/mes/anio hora:minutos:segundos', () => {
    let fecha = new Date();
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1;
    let anio = fecha.getFullYear();
    let fechaStr = dia + "/" + mes + "/" + anio;
    let hora = fecha.getHours();
    let minutos = fecha.getMinutes();
    let segundos = fecha.getSeconds();
    let horaStr = hora + ":" + minutos + ":" + segundos;
    let fechaHoraStr = fechaStr + " " + horaStr;
    expect(calendario.getFechaHora()).toBe(fechaHoraStr);
})


test('La fecha debe ser la correcta en formato dia/mes personalizado', () => {
    let fecha = new Date();
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1;
    let fechaStr = dia + "/" + mes;
    expect(calendario.getFechaHoraFormato("dd/mm")).toBe(fechaStr);
})