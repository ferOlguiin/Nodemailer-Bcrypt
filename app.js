import express from "express";
import router from "./routes/index.routes.js";
import cors from 'cors';
import device from 'express-device';

const app = express();

app.use(cors({origin:true}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(device.capture({parseUserAgent: true}));
app.set('trust proxy', true);


app.use(router)

export default app