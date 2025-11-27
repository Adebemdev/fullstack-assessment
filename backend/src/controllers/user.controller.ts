import { Request, Response } from 'express';

import { UserService } from '../services/user.service';

interface RequesBody {
  name: string;
  email: string;
  password: string;
}

export class UserController {
  static async create(req: Request<{}, {}, RequesBody>, res: Response) {
    try {
      const { name, email, password } = req.body;
      const user = await UserService.createUser(name, email, password);
      res.status(201).json({
        message: 'User created successffuly',
        user,
      });
    } catch (err) {
      res.status(500).json({
        message: 'Error creating user',
        error: err instanceof Error ? err.message : err,
      });
      console.log(err);
    }
  }

  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getUsers();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({
        message: 'Error fetching users',
        error: err instanceof Error ? err.message : err,
      });
    }
  }

  static async getUser(req: Request, res: Response) {
    try {
      const userId = Number(req.params.id);
      const user = await UserService.getUserById(userId);

      if (!user) {
        res.status(404).json({
          message: 'User not found',
        });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({
        message: 'Error fetching user',
        error: err instanceof Error ? err.message : err,
      });
    }
  }
}
