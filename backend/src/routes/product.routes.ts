import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';

const productRoutes = Router();

// All products → everyone logged in
productRoutes.get('/', authMiddleware, ProductController.getAll);

// Single product → everyone logged in
productRoutes.get('/:id', authMiddleware, ProductController.getOne);

// Add product → staff + admin
productRoutes.post(
  '/',
  authMiddleware,
  requireRole('staff', 'admin'),
  ProductController.create
);

// Edit product → staff + admin
productRoutes.patch(
  '/',
  authMiddleware,
  requireRole('staff', 'admin'),
  ProductController.update
);

// Delete product → admin only
productRoutes.delete(
  '/',
  authMiddleware,
  requireRole('admin'),
  ProductController.delete
);

export default productRoutes;
