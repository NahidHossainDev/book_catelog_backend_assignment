import { Roles } from '@prisma/client';
import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = Router();

router.post(
  '/',
  auth(Roles.ADMIN),
  validateRequest(UserValidation.create),
  UserController.insertData
);
router.get('/', UserController.getAllData);
router.get('/:id', UserController.getOneById);
router.patch(
  '/:id',
  validateRequest(UserValidation.update),
  UserController.updateOne
);
router.patch('/:id', UserController.deleteOne);

export const UserRouter = router;
