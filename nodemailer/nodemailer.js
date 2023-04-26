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

export const warningMail = async (name, email, ip, result, dispositiveType, dispositiveName) => {
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
        subject: `Logeo inusual de app`,
        text: `Hola, ${name}, hemos detectado un inicio de sesión desde una IP diferente a la que usualmente utilizas, quien está ingresando tiene la ip ${ip}, se encuentra en el país ${result.country_name}, la provincia de la cual proviene el inicio de sesión es ${result.state_prov}, su codigo postal es ${result.zipcode}, el proveedor de internet que utiliza es ${result.organization} y el día y hora en que ha ocurrido esto ha sido ${result.time_zone.current_time}. Se ha conectado mediante un dispositivo de tipo ${dispositiveType} y el nombre del dispositivo es ${dispositiveName}. Si has sido tú desde otro dispositivo, porfavor ignora este mensaje.`

    }
    const transport = nodemailer.createTransport(config);

    //el transporte ya esta listo arriba ahora sigue el envio, el transport es una funcion asyncrona
    const info = await transport.sendMail(message);
    return info
}