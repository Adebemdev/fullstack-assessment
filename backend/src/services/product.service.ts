import { Request, Response } from 'express';
import { prisma } from '../prisma/prisma';
import { Prisma } from '@prisma/client/edge';

interface PaginationInput {
  skip: number;
  take: number;
}

export class ProductService {
  static async getAll(paginated: PaginationInput) {
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        skip: paginated.skip,
        take: paginated.take,
        orderBy: { id: 'desc' },
      }),
      prisma.product.count(),
    ]);
    return { products, total };
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
