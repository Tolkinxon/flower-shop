import { Router } from "express";
import checkToken from "../middlewares/chekToken.js";
import { checkAdmin } from "../middlewares/checkAdmin.js";
import categoryController from "../controllers/category.controller.js";

export const categoryRouter = Router();

categoryRouter.post('/create', checkAdmin, categoryController.CREATE_CATEGORY);
categoryRouter.delete('/delete/:id', checkAdmin, categoryController.DELETE);
categoryRouter.put('/update/:id', checkAdmin, categoryController.UPDATE);

