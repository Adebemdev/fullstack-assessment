import { prisma } from '../prisma/prisma';
import { Prisma } from '@prisma/client/edge';

export class ProductService {
  static async getAll() {
    return prisma.product.findMany();
  }

  static async getOne(id: number) {
    return prisma.product.findUnique({ where: { id } });
  }
  // Create a new product
  static async create(data: Prisma.ProductCreateInput) {
    return prisma.product.create({
      data,
    });
  }

  // Update an existing product
  static async update(id: number, data: Prisma.ProductUpdateInput) {
    return prisma.product.update({
      where: { id },
      data,
    });
  }

  // Delete a product
  static async delete(id: number) {
    return prisma.product.delete({
      where: { id },
    });
  }
}
