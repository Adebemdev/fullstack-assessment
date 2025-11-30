import express from 'express';
import usersRoutes from './routes/user.routes';
import cookieParser from 'cookie-parser';
import authroutes from './routes/auth.routes';
import { authMiddleware } from './middlewares/auth.middleware';
import productRoutes from './routes/product.routes';

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authroutes);
app.use('/api/refresh', authMiddleware, authroutes);
app.use('/api/users', authMiddleware, usersRoutes);

app.use('/api/products', productRoutes);

export default app;
