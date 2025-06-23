import { Router } from "express";
import authController from "../controllers/auth.controller.js";

export const authRouter = Router();

authRouter.post('/register', authController.REGISTER);
authRouter.post('/login', authController.LOGIN);