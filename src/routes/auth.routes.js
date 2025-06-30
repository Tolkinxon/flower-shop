import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import checkToken from "../middlewares/chekToken.js";
import { checkAdmin } from "../middlewares/checkAdmin.js";

export const authRouter = Router();

authRouter.post('/register', authController.REGISTER);
authRouter.post('/login', authController.LOGIN);
authRouter.post('/admin',checkToken, checkAdmin, authController.ADD_ADMIN);
authRouter.delete('/delete/:id', authController.DELETE);
authRouter.put('/update/:id', authController.UPDATE);