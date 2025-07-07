import { Router } from "express";
import { checkAdmin } from "../middlewares/checkAdmin.js";
import flowerController from "../controllers/flower.controller.js";
import { flowerImageUpload } from "../lib/storage.js";

export const flowerRouter = Router();

flowerRouter.post('/create', checkAdmin, flowerImageUpload.single('image_path'), flowerController.CREATE_FLOWER);
flowerRouter.get('/all', flowerController.GET_FLOWER);
flowerRouter.route('/:id').get(flowerController.GET_FLOWER).put(checkAdmin,flowerImageUpload.single('image_path'), flowerController.UPDATE).delete(checkAdmin, flowerController.DELETE);

