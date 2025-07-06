import { Router } from "express";
import checkToken from "../middlewares/chekToken.js";
import { checkAdmin } from "../middlewares/checkAdmin.js";
import categoryController from "../controllers/category.controller.js";

export const categoryRouter = Router();

categoryRouter.get('/all', categoryController.GET_CATEGORY);
categoryRouter.route('/:id').get(categoryController.GET_CATEGORY).put(checkAdmin, categoryController.UPDATE).delete(checkAdmin, categoryController.DELETE);
categoryRouter.post('/create', checkAdmin, categoryController.CREATE_CATEGORY);

