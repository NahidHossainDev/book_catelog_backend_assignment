import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = Router();

router.post(
  '/sign-up',
  validateRequest(AuthValidation.signUp),
  AuthController.signUp
);

router.post(
  '/sign-in',
  validateRequest(AuthValidation.signIn),
  AuthController.signIn
);

export const AuthRouter = router;
