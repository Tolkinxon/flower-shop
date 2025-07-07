import { Router } from  "express";
import paymentController from "../controllers/payment.controller.js";

export const paymentRouter = Router();

paymentRouter.post('/order/:id', paymentController.CREATE_PAYMENT);