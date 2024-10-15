import { Roles } from '@prisma/client';
import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validation';

const router = Router();

router.post(
  '/',
  auth(Roles.ADMIN),
  validateRequest(CategoryValidation.create),
  CategoryController.insertData
);
router.get('/', auth(Roles.ADMIN), CategoryController.getAllData);
router.get('/:id', auth(Roles.ADMIN), CategoryController.getOneById);
router.patch(
  '/:id',
  auth(Roles.ADMIN),
  validateRequest(CategoryValidation.update),
  CategoryController.updateOne
);
router.delete('/:id', auth(Roles.ADMIN), CategoryController.deleteOne);

export const CategoryRouter = router;
