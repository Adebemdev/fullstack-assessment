import { prisma } from '../prisma/prisma';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions, Secret } from 'jsonwebtoken';

if (!process.env.JWT_SECRET) {
  throw new Error(
    'FATAL ERROR: JWT_SECRET is not defined in environment variables.'
  );
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const JWT_SECRET: Secret = process.env.JWT_SECRET;

export class AuthService {
  static async register(
    name: string,
    email: string,
    password: string,
    role: 'admin' | 'staff' = 'staff'
  ) {
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
        role,
      },
    });
    const tokens = this.buildTokens(user.id, user.role);
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      ...tokens,
    };
  }

  static async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('Invalid credentials');
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new Error('Invalid credentials');

    const tokens = this.buildTokens(user.id, user.role, user);
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: tokens.refreshToken },
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      ...tokens,
    };
  }

  static async refreshToken(oldRefreshToken: string) {
    if (!oldRefreshToken) throw new Error('No refresh token provided');
    const payload = jwt.verify(oldRefreshToken, JWT_SECRET) as any;
    // const userId = { userId: payload.userId };
    const userId = payload.userId;
    // Find user with this refresh token
    const user = await prisma.user.findFirst({
      where: { id: userId },
    });
    if (!user) throw new Error('Invalid refresh token');

    const tokens = this.buildTokens(user.id, user.role, user);
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      ...tokens,
    };
  }
  static async logout(userId: number) {
    await prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
    return true;
  }
  private static buildTokens(userId: number, role: string, user?: any) {
    const accessToken = jwt.sign({ sub: userId, role }, JWT_SECRET, {
      expiresIn: '15m',
    });
    const refreshToken = jwt.sign({ sub: userId, role }, JWT_SECRET, {
      expiresIn: '7d',
    });
    return { accessToken, refreshToken };
  }
}
