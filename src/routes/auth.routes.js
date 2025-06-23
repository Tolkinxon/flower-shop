import { Router } from "express";
import authController from "../controllers/auth.controller.js";

export const authRouter = Router();

authRouter.post('/register', authController.REGISTER);
authRouter.post('/login', authController.LOGIN);
authRouter.delete('/delete/:id', authController.DELETE);
authRouter.put('/update/:id', authController.UPDATE);
authRouter.get('/users', authController.USERS);