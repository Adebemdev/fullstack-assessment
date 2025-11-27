import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

// Define a custom interface to extend the Express Request type
interface RequestWithUser extends Request {
  user?: {
    userId: number;
    role: string;
  };
}

export class AuthContoller {
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password, role } = req.body;
      if (!name || !email || !password) {
        res.status(404).json({
          message: 'Missing fields',
        });
      }
      const data = await AuthService.register(
        name,
        email,
        password,
        role || 'staff'
      );
      res.cookie('refreshToken', data.refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
      return res
        .status(201)
        .json({ user: data.user, accessToken: data.accessToken });
    } catch (err) {
      let message = 'Registration failed';
      if (err instanceof Error) {
        message = err.message;
      }
      return res.status(400).json({ message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res.status(404).json({ message: 'Missing fields' });
      const data = await AuthService.login(email, password);
      res.cookie('refreshToken', data.refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
      return res.json({ user: data.user, accessToken: data.accessToken });
    } catch (err) {
      console.log(err);
      let message = 'Login failed';
      if (err instanceof Error) {
        message = err.message;
      }
      return res.status(400).json({ message });
    }
  }

  static async refresh(req: Request, res: Response) {
    try {
      const token = req.cookies?.refreshToken;
      const data = await AuthService.refreshToken(token);
      res.cookie('refreshToken', data.refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
      return res.json({ user: data.user, accessToken: data.accessToken });
    } catch (err) {
      let message = 'Login failed';
      if (err instanceof Error) {
        message = err.message;
      }
      return res.status(400).json({ message });
    }
  }

  static async logout(req: RequestWithUser, res: Response) {
    try {
      // Now TypeScript knows about req.user
      const userId = Number(req.body.userId || req.user?.userId);
      if (!userId) return res.status(400).json({ message: 'Missing userId' });
      await AuthService.logout(userId);
      res.clearCookie('refreshToken');
      return res.json({ success: true });
    } catch (err) {
      let message = 'Login failed';
      if (err instanceof Error) {
        message = err.message;
      }
      return res.status(500).json({ message });
    }
  }
}
