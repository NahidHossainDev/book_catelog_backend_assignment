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
router.get('/', auth(Roles.ADMIN), UserController.getAllData);
router.get('/:id', auth(Roles.ADMIN), UserController.getOneById);
router.patch(
  '/:id',
  auth(Roles.ADMIN),
  validateRequest(UserValidation.update),
  UserController.updateOne
);
router.delete('/:id', auth(Roles.ADMIN), UserController.deleteOne);

export const UserRouter = router;
