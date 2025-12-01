import { DocumentService } from '../services/document.service';
import { CreateDocumentInput } from '../config/document';
import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';

export class DocumentContoller {
  static upload = catchAsync(
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      const user = req.user;
      if (!user) {
        return next(new AppError('User not found, authorization denied', 401));
      }

      const file = req.file;
      if (!file) {
        return next(new AppError('No file uploaded', 400));
      }

      const payload: CreateDocumentInput = {
        fileName: file.filename,
        originalName: file.originalname,
        filePath: `/uploads/${file.filename}`,
        mimeType: file.mimetype,
        size: file.size,
        fileType: file.mimetype.startsWith('image/') ? 'image' : 'document',
        uploadedBy: user.id,
      };

      const doc = await DocumentService.uploadDoc(payload);

      res.status(201).json({
        message: 'Document is successfully uploaded',
        document: doc,
      });
    }
  );

  static getAll = catchAsync(async (req: Request, res: Response) => {
    const docs = await DocumentService.getAll();
    res.status(201).json({
      message: 'All files uploaded',
      document: docs,
    });
  });

  static getOne = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = Number(req.params.id);
      const doc = await DocumentService.getOne(id);

      if (!doc) {
        return next(new AppError('Document is not found', 404));
      }

      res.status(200).json({
        document: doc,
      });
    }
  );
}
