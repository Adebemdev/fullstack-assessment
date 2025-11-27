import { Router } from 'express';
import { AuthContoller } from '../controllers/auth.controller';

// const router = Router();
const authroutes = Router();

authroutes.post('/register', AuthContoller.register);
authroutes.post('/login', AuthContoller.login);
authroutes.get('/refresh', AuthContoller.refresh);
authroutes.post('/logout', AuthContoller.logout);

export default authroutes;
