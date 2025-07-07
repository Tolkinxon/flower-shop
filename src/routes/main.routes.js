import { Router } from 'express';
import { authRouter } from './auth.routes.js';
import { categoryRouter } from './category.routes.js';
import { flowerRouter } from './flower.routes.js';
import checkToken from '../middlewares/chekToken.js';
import { addressRouter } from './address.routes.js';
import { orderRouter } from './order.routes.js';
import { paymentRouter } from './payment.routes.js';

export const mainRouter = Router();

mainRouter.use('/auth', authRouter);
mainRouter.use(checkToken);
mainRouter.use('/category', categoryRouter);
mainRouter.use('/flower', flowerRouter);
mainRouter.use('/address', addressRouter);
mainRouter.use('/order', orderRouter);
mainRouter.use('/payment', paymentRouter);
 