import { EmailManager } from "../emailmanager";
import { EmailLeaf } from "../CarpetaComposite/EmailLeaf";
import { CarpetaComposite } from "../CarpetaComposite/CarpetaComposite";
import { Contacto } from "../contacto";


test('Crear Mails en una Carpeta', () => {
  let emailTest1: EmailLeaf = new EmailLeaf("asunto1", "contenido1", new Contacto("nombre1", "email1"), [new Contacto("nombre2", "email2")]);
  let emailTest2: EmailLeaf = new EmailLeaf("asunto2", "contenido2", new Contacto("nombre1", "email1"), [new Contacto("nombre3", "email3")]);
  let emailTest3: EmailLeaf = new EmailLeaf("asunto3", "contenido3", new Contacto("nombre1", "email1"), [new Contacto("nombre2", "email2")]);
  let emailTest4: EmailLeaf = new EmailLeaf("asunto4", "contenido4", new Contacto("nombre1", "email1"), [new Contacto("nombre3", "email3")]);

  let carpetaNueva: CarpetaComposite = new CarpetaComposite("Carpeta1", 2);
  carpetaNueva.Add(emailTest1);
  carpetaNueva.Add(emailTest2);
  carpetaNueva.Add(emailTest3);
  carpetaNueva.Add(emailTest4);

  expect(carpetaNueva.CantidadEmails()).toBe(4);
})


test('Agregar la Bandeja de salida con la carpeta creada', () => {
  let emailTest1: EmailLeaf = new EmailLeaf("asunto1", "contenido1", new Contacto("nombre1", "email1"), [new Contacto("nombre2", "email2")]);
  let emailTest2: EmailLeaf = new EmailLeaf("asunto2", "contenido2", new Contacto("nombre1", "email1"), [new Contacto("nombre3", "email3")]);
  let emailTest3: EmailLeaf = new EmailLeaf("asunto3", "contenido3", new Contacto("nombre1", "email1"), [new Contacto("nombre2", "email2")]);
  let emailTest4: EmailLeaf = new EmailLeaf("asunto4", "contenido4", new Contacto("nombre1", "email1"), [new Contacto("nombre3", "email3")]);

  let carpetaNueva: CarpetaComposite = new CarpetaComposite("Carpeta1", 2);
  carpetaNueva.Add(emailTest1);
  carpetaNueva.Add(emailTest2);
  carpetaNueva.Add(emailTest3);
  carpetaNueva.Add(emailTest4);

  //creo un nuevo email solo en la bandeja de salida
  let emailTest5: EmailLeaf = new EmailLeaf("asunto4", "contenido4", new Contacto("nombre1", "email1"), [new Contacto("nombre5", "email5")]);

  let bandejaSalida: CarpetaComposite = new CarpetaComposite("Bandeja de Salida", 1);
  //añado el mail a la bandeja de salida
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
  const email = new EmailLeaf("asunto1", "contenido1", new Contacto("nombre1", "email1"), [new Contacto("nombre2", "email2")]);
  expect(email).toBeDefined();
});

test('Al crear email para 2 receptores la cantidad debe ser igual a 2 ', () => {
  const email = new EmailLeaf("asunto1", "contenido1", new Contacto("nombre1", "email1"), [new Contacto("nombre2", "email2")]);
  const receptor2 = new Contacto("Maxi Gonzalez", "maxi@gmail.com");
  email.Para.push(receptor2); 
  expect(email.Para.length).toBe(2);
});

test('Al Crear y enviar email completo debe ser igual true', () => {
  const emailManager = new EmailManager();
  const email = new EmailLeaf("asunto1", "contenido1", new Contacto("nombre1", "email1"), [new Contacto("nombre2", "email2")]);
  expect(emailManager.Enviar(email)).toBe(true);
});

test('Al crear y enviar mail sin el remitente debe ser igual false', () => {
  const emailManager = new EmailManager();
  const email = new EmailLeaf("asunto1", "contenido1",null, [new Contacto("nombre2", "email2")]);
  expect(emailManager.Enviar(email)).toBe(false);
});

test('create and send mail without Asunto to equal false', () => {
  const emailManager = new EmailManager();
  const email = new EmailLeaf("", "contenido1", new Contacto("nombre1", "email1"), [new Contacto("nombre2", "email2")]);
  expect(emailManager.Enviar(email)).toBe(false);
});

test('create and send mail without Contenido to equal false', () => {
  const emailManager = new EmailManager();
  const email = new EmailLeaf("asunto1", "", new Contacto("nombre1", "email1"), [new Contacto("nombre2", "email2")]);
  expect(emailManager.Enviar(email)).toBe(false);
});

test('create and send mail without Receptor to equal false', () => {
  const emailManager = new EmailManager();
  const email = new EmailLeaf("asunto1", "contenido1", new Contacto("nombre1", "email1"), []);
  expect(emailManager.Enviar(email)).toBe(false);
});

test('read bandeja Enviados before send emails to equal 0', () => {
  const emailManager = new EmailManager();
  expect(emailManager.BandejaEnviados.CantidadEmails()).toBe(0);
});

test('read Bandeja Enviados after send emails to equal 1', () => {
  const emailManager = new EmailManager();
  const email = new EmailLeaf("asunto1", "contenido1", new Contacto("nombre1", "email1"), [new Contacto("nombre2", "email2")]);
  emailManager.Enviar(email)
  expect(emailManager.BandejaEnviados.CantidadEmails()).toBe(1);
});