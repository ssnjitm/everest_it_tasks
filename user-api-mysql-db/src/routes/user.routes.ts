import { Router, RequestHandler } from 'express';
import * as UserController from '../controllers/user.controller.js';
import { validateUser } from '../middlewares/validate.js'; 
import { isAuthenticated } from '../middlewares/auth.js';
import { hasRole } from '../middlewares/checkRole.js';

const router = Router();

// Public Routes
router.post('/signup', validateUser as RequestHandler, UserController.signup as RequestHandler);
router.post('/login', UserController.login as RequestHandler);

// Protected Routes (User/General)
router.get('/profile', isAuthenticated as RequestHandler, UserController.getProfile as RequestHandler);
router.patch('/user/:userId', isAuthenticated as RequestHandler, UserController.updateUser as RequestHandler);

// Admin Routes
router.get('/user/all', 
  isAuthenticated as RequestHandler, 
  hasRole('ADMIN') as RequestHandler, 
  UserController.getAllUsers as RequestHandler
);

router.delete('/user/:userId', 
  isAuthenticated as RequestHandler, 
  hasRole('ADMIN') as RequestHandler, 
  UserController.deleteUser as RequestHandler
);

export default router;