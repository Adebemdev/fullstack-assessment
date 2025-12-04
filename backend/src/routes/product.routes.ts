import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';

const productRoutes = Router();

// All products → everyone logged in
productRoutes.get('/', authMiddleware, ProductController.getAll);

// productRoutes.get('/paginated', authMiddleware, ProductController.getPaginated);

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
  '/:id',
  authMiddleware,
  requireRole('staff', 'admin'),
  ProductController.update
);

// Delete product → admin only
productRoutes.delete(
  '/:id',
  authMiddleware,
  requireRole('admin'),
  ProductController.delete
);

export default productRoutes;
