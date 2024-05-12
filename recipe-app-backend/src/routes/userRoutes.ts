import express, { Router } from 'express';
import UserController from '../controllers/UserController';

const router: Router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);

export default router;
