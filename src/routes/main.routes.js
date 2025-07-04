import { Router } from 'express';
import { authRouter } from './auth.routes.js';
import { categoryRouter } from './category.routes.js';
import { flowerRouter } from './flower.routes.js';
import checkToken from '../middlewares/chekToken.js';

export const mainRouter = Router();

mainRouter.use('/auth', authRouter);
mainRouter.use(checkToken);
mainRouter.use('/category', categoryRouter);
mainRouter.use('/flower', flowerRouter);
 