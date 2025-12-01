import express, { NextFunction, Request, Response } from 'express';
import usersRoutes from './routes/user.routes';
import cookieParser from 'cookie-parser';
import authroutes from './routes/auth.routes';
import { authMiddleware } from './middlewares/auth.middleware';
import productRoutes from './routes/product.routes';
import documentRoutes from './routes/document.routes';
import path from 'path';
import AppError from './utils/appError';
import { errorHandler } from './middlewares/errorHandler.middleware';

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api/auth', authroutes);
app.use('/api/refresh', authMiddleware, authroutes);
app.use('/api/users', authMiddleware, usersRoutes);

app.use('/api/products', productRoutes);

app.use('/api/documents', documentRoutes);

app.all(/.*/, (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

export default app;
