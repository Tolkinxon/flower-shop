import { Router } from 'express';
import { authRouter } from './auth.routes.js';
import { categoryRouter } from './category.routes.js';

export const mainRouter = Router();

mainRouter.use('/auth', authRouter);
mainRouter.use('/category', categoryRouter);
