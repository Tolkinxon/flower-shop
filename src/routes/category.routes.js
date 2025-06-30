import { Router } from "express";
import checkToken from "../middlewares/chekToken.js";
import { checkAdmin } from "../middlewares/checkAdmin.js";
import categoryController from "../controllers/category.controller.js";

export const categoryRouter = Router();

categoryRouter.post('/create', checkToken, checkAdmin, categoryController.CREATE_CATEGORY);
categoryRouter.delete('/delete/:id', checkToken, checkAdmin, categoryController.DELETE);
categoryRouter.put('/update/:id', checkToken, checkAdmin, categoryController.UPDATE);

