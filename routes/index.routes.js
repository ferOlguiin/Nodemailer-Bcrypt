import { Router } from "express";
import { ipData, loginUser, registerUser, welcome } from "../controllers/index.controllers.js";

const router = Router();

router.get("/", welcome)
router.post("/createuser", registerUser);
router.post("/login", loginUser);
router.get("/ipdata", ipData)

export default router