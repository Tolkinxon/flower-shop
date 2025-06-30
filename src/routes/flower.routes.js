import { Router } from "express";
import checkToken from "../middlewares/chekToken.js";
import { checkAdmin } from "../middlewares/checkAdmin.js";
import flowerController from "../controllers/flower.controller.js";

export const flowerRouter = Router();

flowerRouter.post('/create', checkToken, checkAdmin, flowerController.CREATE_FLOWER);
// categoryRouter.delete('/delete/:id', checkToken, checkAdmin, categoryController.DELETE);
// categoryRouter.put('/update/:id', checkToken, checkAdmin, categoryController.UPDATE);

