import { Router } from 'express';
import { DocumentContoller } from '../controllers/document.controller';
import { upload } from '../middlewares/uploads.middleware';
import { authMiddleware } from '../middlewares/auth.middleware';

const documentRoutes = Router();

documentRoutes.get('/', authMiddleware, DocumentContoller.getAll);
documentRoutes.get('/:id', authMiddleware, DocumentContoller.getOne);

documentRoutes.post(
  '/upload',
  authMiddleware,
  upload.single('file'),
  DocumentContoller.upload
);

export default documentRoutes;
