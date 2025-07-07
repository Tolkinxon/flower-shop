import { Router } from "express";
import addressController from "../controllers/address.controller.js";

export const addressRouter = Router();

addressRouter.post("/create", addressController.CREATE_ADDRESS);
addressRouter.get('/all', addressController.GET_ADDRESS);
addressRouter.route('/:id').get(addressController.GET_ADDRESS).put(addressController.UPDATE).delete(addressController.DELETE);

