import nodemailer from 'nodemailer';
import { APP_PASS } from '../config.js';

export const sendMail = async (name, email) =>{
    //aca especifico los datos que nodemailer solicita
    const config = {
        service : "hotmail",
        host: 'smtp-mail.outlook.com',
        port : 587,
        auth : {
            user: "developerfer@hotmail.com",
            pass: APP_PASS
        },
        
    }
    const message = {
        from: "developerfer@hotmail.com",
        to: email,
        subject: `Bienvenido a la App`,
        text: `Hola, ${name}, bienvenido a nuestra app, este correo es para confirmarte que ya estas registrado con éxito en nuestra plataforma. Saludos!`

    }
    const transport = nodemailer.createTransport(config);

    //el transporte ya esta listo arriba ahora sigue el envio, el transport es una funcion asyncrona
    const info = await transport.sendMail(message);
    return info
};