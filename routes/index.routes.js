import { Router } from "express";
import { loginUser, registerUser, welcome } from "../controllers/index.controllers.js";

const router = Router();

router.get("/", welcome)
router.post("/createuser", registerUser);
router.post("/login", loginUser);

export default router