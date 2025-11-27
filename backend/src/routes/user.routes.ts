import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

// const router = Router();
const usersRoutes = Router();

usersRoutes.post('/', UserController.create);
usersRoutes.get('/', UserController.getAllUsers);
usersRoutes.get('/:id', UserController.getUser);

export default usersRoutes;
