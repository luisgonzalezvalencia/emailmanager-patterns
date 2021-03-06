import { EmailManager } from "../emailmanager";
import { EmailLeaf } from "../CarpetaComposite/EmailLeaf";
import { CarpetaComposite } from "../CarpetaComposite/CarpetaComposite";
import { Contacto } from "../contacto";
import { Calendario } from "../CalendarioSingleton/Calendario";
import { MailRetrasoStrategy } from "../MailStrategy/MailRetraso.strategy";
import { TaskManager } from "../taskmanager";
import { MailNormalStrategy } from "../MailStrategy/MailNormal.strategy";

//convertimos la instancia de email manager como singleton para tenerla disponible en todo el proyecto
const emailManager = EmailManager.getInstance();

test('Crear Mails en una Carpeta', () => {
  let emailTest1: EmailLeaf = new EmailLeaf("asunto1", "contenido1", new Contacto("nombre1", "email1@gmail.com"), [new Contacto("nombre2", "email2@gmail.com")]);
  let emailTest2: EmailLeaf = new EmailLeaf("asunto2", "contenido2", new Contacto("nombre1", "email1@gmail.com"), [new Contacto("nombre3", "email3@gmail.com")]);
  let emailTest3: EmailLeaf = new EmailLeaf("asunto3", "contenido3", new Contacto("nombre1", "email1@gmail.com"), [new Contacto("nombre2", "email2@gmail.com")]);
  let emailTest4: EmailLeaf = new EmailLeaf("asunto4", "contenido4", new Contacto("nombre1", "email1@gmail.com"), [new Contacto("nombre3", "email3@gmail.com")]);

  let carpetaNueva: CarpetaComposite = new CarpetaComposite("Carpeta1", 2);
  carpetaNueva.Add(emailTest1);
  carpetaNueva.Add(emailTest2);
  carpetaNueva.Add(emailTest3);
  carpetaNueva.Add(emailTest4);

  expect(carpetaNueva.CantidadEmails()).toBe(4);
})


test('Agregar la Bandeja de salida con la carpeta creada', () => {
  let emailTest1: EmailLeaf = new EmailLeaf("asunto1", "contenido1", new Contacto("nombre1", "email1@gmail.com"), [new Contacto("nombre2", "email2@gmail.com")]);
  let emailTest2: EmailLeaf = new EmailLeaf("asunto2", "contenido2", new Contacto("nombre1", "email1@gmail.com"), [new Contacto("nombre3", "email3@gmail.com")]);
  let emailTest3: EmailLeaf = new EmailLeaf("asunto3", "contenido3", new Contacto("nombre1", "email1@gmail.com"), [new Contacto("nombre2", "email2@gmail.com")]);
  let emailTest4: EmailLeaf = new EmailLeaf("asunto4", "contenido4", new Contacto("nombre1", "email1@gmail.com"), [new Contacto("nombre3", "email3@gmail.com")]);

  let carpetaNueva: CarpetaComposite = new CarpetaComposite("Carpeta1", 2);
  carpetaNueva.Add(emailTest1);
  carpetaNueva.Add(emailTest2);
  carpetaNueva.Add(emailTest3);
  carpetaNueva.Add(emailTest4);

  //creo un nuevo email solo en la bandeja de salida
  let emailTest5: EmailLeaf = new EmailLeaf("asunto4", "contenido4", new Contacto("nombre1", "email1@gmail.com"), [new Contacto("nombre5", "email5@gmail.com")]);

  let bandejaSalida: CarpetaComposite = new CarpetaComposite("Bandeja de Salida", 1);
  //a??ado el mail a la bandeja de salida
  bandejaSalida.Add(emailTest5);

  //puedo agregar toda una carpeta dentro de otra
  bandejaSalida.Add(carpetaNueva);

  //se espera que tenga los 5 mails de la carpeta 1  + el mail que se agrego a la bandeja de salida
  expect(bandejaSalida.CantidadEmails()).toBe(5);

  //se espera que la carpeta nueva solo tenga los 4 elementos iniciales
  expect(carpetaNueva.CantidadEmails()).toBe(4);
})


test('Al crear el receptor debe estar definido', () => {
  const receptor = new Contacto("Cosme fulanito", "cosmefulanito@gmail.com");
  expect(receptor).toBeDefined();
});

test('Al crear el remitente debe estar definido', () => {
  const remitente = new Contacto("Juan Perez", "juanperez@gmail.com");
  expect(remitente).toBeDefined();
});


test('Al crear email para 1 receptor debe estar definido', () => {
  const email = new EmailLeaf("asunto1", "contenido1", new Contacto("nombre1", "email1@gmail.com"), [new Contacto("nombre2", "email2@gmail.com")]);
  expect(email).toBeDefined();
});

test('Al crear email para 2 receptores la cantidad debe ser igual a 2 ', () => {
  const email = new EmailLeaf("asunto1", "contenido1", new Contacto("nombre1", "email1@gmail.com"), [new Contacto("nombre2", "email2@gmail.com")]);
  const receptor2 = new Contacto("Maxi Gonzalez", "maxi@gmail.com");
  email.Para.push(receptor2);
  expect(email.Para.length).toBe(2);
});

test('Al leer la bandeja Enviados antes de enviar emails, la cantidad debe ser igual a 0', () => {
  expect(emailManager.BandejaEnviados.CantidadEmails()).toBe(0);
});

test('Al leer la Bandeja Enviados despu??s de enviar un email, debe ser igual a 1', () => {
  const email = new EmailLeaf("asunto1", "contenido1", new Contacto("nombre1", "email1@gmail.com"), [new Contacto("nombre2", "email2@gmail.com")]);
  emailManager.Enviar(email)
  expect(emailManager.BandejaEnviados.CantidadEmails()).toBe(1);
});

test('Al Crear y enviar email completo debe ser igual true', () => {
  const email = new EmailLeaf("asunto1", "contenido1", new Contacto("nombre1", "email1@gmail.com"), [new Contacto("nombre2", "email2@gmail.com")]);
  expect(emailManager.Enviar(email)).toBe(true);
});

test('Al crear y enviar mail sin el remitente debe ser igual false', () => {
  const email = new EmailLeaf("asunto1", "contenido1", null, [new Contacto("nombre2", "email2@gmail.com")]);
  expect(emailManager.Enviar(email)).toBe(false);
});

test('Al crear y enviar mail sin el Asunto debe ser igual false', () => {
  const email = new EmailLeaf("", "contenido1", new Contacto("nombre1", "email1@gmail.com"), [new Contacto("nombre2", "email2@gmail.com")]);
  expect(emailManager.Enviar(email)).toBe(false);
});

test('Al crear y enviar mail sin el Contenido debe ser igual false', () => {
  const email = new EmailLeaf("asunto1", "", new Contacto("nombre1", "email1@gmail.com"), [new Contacto("nombre2", "email2@gmail.com")]);
  expect(emailManager.Enviar(email)).toBe(false);
});

test('Al crear y enviar mail sin el Receptor debe ser igual false', () => {
  const email = new EmailLeaf("asunto1", "contenido1", new Contacto("nombre1", "email1@gmail.com"), []);
  expect(emailManager.Enviar(email)).toBe(false);
});

test('Al enviar un email, la fecha de envio debe ser la fecha actual', () => {
  const email = new EmailLeaf("asunto1", "contenido1", new Contacto("nombre1", "email1@gmail.com"), [new Contacto("nombre2", "email2@gmail.com")]);
  let calendario = Calendario.getInstance();
  emailManager.Enviar(email);
  expect(email.getFechaEnvio()).toEqual(calendario.getFecha());
});

test('Al leer un mail de la bandeja de entrada, marcarlo como leeido', () => {
  const email = new EmailLeaf("asunto1", "contenido1", new Contacto("nombre1", "email1@gmail.com"), [new Contacto("nombre2", "email2@gmail.com")]);
  //simuamos que me mandaron un mail y me lleg??
  email.setEmailEnviado();
  emailManager.BandejaEntrada.Add(email);
  //simulamos que leemos el mail
  let calendario = Calendario.getInstance();
  emailManager.BandejaEntrada.OpenEmail(email);
  expect(email.getFechaLeido()).toEqual(calendario.getFecha());
});


test('Enviar mail estrategia con retraso, debe crear una tarea para enviarla en cierta fecha', () => {
  const email = new EmailLeaf("asunto1", "contenido1", new Contacto("nombre1", "email1@gmail.com"), [new Contacto("nombre2", "email2@gmail.com")]);
  let estrategia = new MailRetrasoStrategy();
  let taskManager = TaskManager.getInstance();
  estrategia.fechaEnvio = Calendario.getInstance().getFechaMasDias(1)
  emailManager.setStrategy(estrategia);
  emailManager.Enviar(email)
  let mailPendiente = taskManager.getTask()[0];
  expect(mailPendiente.getFechaEnvio()).toEqual(Calendario.getInstance().getFechaMasDias(1));
  expect(taskManager.getTask().length).toBe(1);
})


test('Enviar mail con estrategia normal, debe mandar el mail inmediatamente sin crear tarea', () => {
  const email = new EmailLeaf("asunto1", "contenido1", new Contacto("nombre1", "email1@gmail.com@gmail.com"), [new Contacto("nombre2", "email2@gmail.com")]);
  let calendario = Calendario.getInstance();
  let estrategia = new MailNormalStrategy();
  emailManager.setStrategy(estrategia);
  emailManager.Enviar(email);
  expect(email.getFechaEnvio()).toEqual(calendario.getFecha());
})

test('Procesar la lista de tareas, debe enviar todos los mails que tengan la fecha actual', () => {
  let taskManager = TaskManager.getInstance();
  let email = new EmailLeaf("asunto1", "contenido1", new Contacto("nombre1", "email1@gmail.com"), [new Contacto("nombre2", "email2@gmail.com")]);
  let estrategia = new MailRetrasoStrategy();
  //simulamos con ello que llego el dia del mail con estrategia de retraso
  estrategia.fechaEnvio = Calendario.getInstance().getFechaMasDias(0);
  emailManager.setStrategy(estrategia);
  emailManager.Enviar(email);
  //simulamos que llego el dia de hoy
  let cantidadMailsEnviados = emailManager.ProcesarListaTareas();
  expect(cantidadMailsEnviados).toBe(1);
})