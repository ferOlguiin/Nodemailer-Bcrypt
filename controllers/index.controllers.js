import { comparePassword, encryptPassword } from "../encrypt/passwordEncrypt.js";
import User from '../models/User.js';
import { sendMail } from "../nodemailer/nodemailer.js";


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
        const newUser = new User({name: name, email: email, password: passwordEncrypted});
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
        return res.send(user)
    } else {
        return res.status(400).send("Contraseña incorrecta")
    }
}

export const ipData = (req, res) => {
    const ip = req.header('x-forwarded-for')
    console.log("esta es la ip del cliente: " + ip);
}