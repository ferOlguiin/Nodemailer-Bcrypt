import dotenv from "dotenv";

dotenv.config();

export const URI_MONGODB = process.env.URI_MONGODB;
export const PORT = process.env.PORT;
export const APP_PASS = process.env.APP_PASS;
export const IPGEO_KEY = process.env.IPGEO_KEY;