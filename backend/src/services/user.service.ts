import { prisma } from '../prisma/prisma';
import bcrypt from 'bcryptjs';

export class UserService {
  static async createUser(name: string, email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    return prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
      },
    });
  }

  static async getUsers() {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  static getUserById(id: number) {
    return prisma.user.findUnique({
      where: { id },
    });
  }
}
