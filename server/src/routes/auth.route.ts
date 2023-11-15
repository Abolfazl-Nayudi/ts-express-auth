import { Response, Request, Router } from 'express';
import { ValidationMiddleware } from '../validation/auth.validate';
import { AuthController } from '../controller/auth.controller';
const router = Router();

router
  .route('/register')
  .post(ValidationMiddleware.registerUser, AuthController.register);

router
  .route('/login')
  .post(ValidationMiddleware.registerUser, AuthController.login);
router
  .route('/refresh')
  .post(ValidationMiddleware.registerUser, AuthController.refresh);

export { router };
