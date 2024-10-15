import { Roles } from '@prisma/client';
import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';

const router = Router();

router.post(
  '/',
  auth(Roles.ADMIN),
  validateRequest(BookValidation.create),
  BookController.insertData
);
router.get('/', BookController.getAllData);
router.get('/:id', BookController.getOneById);
router.patch(
  '/:id',
  auth(Roles.ADMIN),
  validateRequest(BookValidation.update),
  BookController.updateOne
);
router.delete('/:id', auth(Roles.ADMIN), BookController.deleteOne);

export const BookRouter = router;
