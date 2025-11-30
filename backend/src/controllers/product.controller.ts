import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';

export class ProductController {
  static async getAll(req: Request, res: Response) {
    const product = await ProductService.getAll();
    res.json(product);
  }
  static async getOne(req: Request, res: Response) {
    const id = Number(req.params.id);
    const product = await ProductService.getOne(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  }

  static async create(req: Request, res: Response) {
    const data = req.body;
    const product = await ProductService.create(data);
    res.status(201).json({
      message: 'Product created successfully',
      data: product,
    });
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const numId = Number(id);
    if (!numId || isNaN(numId)) {
      return res.status(400).json({ message: 'Ivamide ID number Format' });
    }

    const data = req.body;
    const updated = await ProductService.update(numId, data);
    res.json({ message: 'Product updated', data: updated });
  }

  static async delete(req: Request, res: Response) {
    console.log(req.params);
    const { id } = req.params;
    const numId = Number(id);
    if (!numId || isNaN(numId)) {
      return res.status(400).json({ message: 'Ivamide ID number Format' });
    }

    await ProductService.delete(numId);
    res.json({ message: 'Product deleted' });
  }
}
