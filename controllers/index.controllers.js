import fetch from "node-fetch";
import { comparePassword, encryptPassword } from "../encrypt/passwordEncrypt.js";
import User from '../models/User.js';
import { sendMail, warningMail } from "../nodemailer/nodemailer.js";
import { IPGEO_KEY } from "../config.js";


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
            const data = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${IPGEO_KEY}&ip=${req.ip}`);
            const result = await data.json();
            const dispositiveType = req.device.type;
            const dispositiveName = req.device.name;
            await warningMail(user.name, user.email, req.ip, result, dispositiveType, dispositiveName);
        }
        return res.send(user)
    } else {
        return res.status(400).send("Contraseña incorrecta")
    }
};
