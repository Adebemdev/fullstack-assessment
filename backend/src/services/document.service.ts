import { prisma } from '../prisma/prisma';
import { CreateDocumentInput } from '../config/document';

export class DocumentService {
  static async uploadDoc(data: CreateDocumentInput) {
    return prisma.document.create({
      data,
    });
  }

  static async getAll() {
    return prisma.document.findMany({
      include: { user: true },
      orderBy: { uploadedAt: 'desc' },
    });
  }

  static async getOne(id: number) {
    return prisma.document.findUnique({
      where: { id },
    });
  }
}
