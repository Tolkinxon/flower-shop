import { Router } from "express";
import orderController from "../controllers/order.controller.js";

export const orderRouter = Router();

orderRouter.post('/', orderController.CREATE_ORDER);
orderRouter.get('/:id', orderController.ORDER_CANCEL);