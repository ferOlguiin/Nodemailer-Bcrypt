import fetch from "node-fetch";
import { comparePassword, encryptPassword } from "../encrypt/passwordEncrypt.js";
import User from '../models/User.js';
import { sendMail, warningMail } from "../nodemailer/nodemailer.js";


export const welcome = (req, res) => {
    res.send("Backend de prueba para login, escriptado de contraseñas, notificación de registros por mail y por logeo de ip")
};


export const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const checkUserEmail = await User.find().lean();
        for(let key in checkUserEmail){
            if(checkUserEmail[key].email === email){
                return res.status(400).send("error hay un mail duplicado")
            }
        };
        const passwordEncrypted = await encryptPassword(password);
        const ip = req.ip;
        const newUser = new User({name: name, email: email, password: passwordEncrypted, ip: ip});
        await newUser.save();
        const checkMail = await sendMail(name, email);
        checkMail.messageId ? console.log("email enviado correctamente") : console.log("algo falló al enviar el email");

        return res.send(newUser);
    } catch (error) {
        console.log(error)
    } 
};

export const loginUser = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email})
    const confirmation = await comparePassword(password, user.password)
    if(confirmation){
        if(user.ip !== req.ip){
            await warningMail(user.name, user.email, req.ip)
        }
        return res.send(user)
    } else {
        return res.status(400).send("Contraseña incorrecta")
    }
}

export const ipData = async (req, res) => {
    const data = await fetch("https://api.ipgeolocation.io/ipgeo?apiKey=88cd195c03924c4ca81a6c295a72828c&ip=" + req.ip);
    const result = await data.json();
    console.log("estos son los datos de la ipdata.io: ", result)
    console.log(`el usuario que esta ingresando tiene la ip ${req.ip}, el codigo de su continente es ${result.continent_code}, el nombre de su pais es ${result.country_name}, su codigo postal es ${result.zipcode}, y su provincia es ${result.state_prov}. Se ha conectado mediando un dispositivo de tipo ${req.device.type} y el nombre del dispositivo es ${req.device.name}`)
}