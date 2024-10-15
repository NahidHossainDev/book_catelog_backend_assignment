import { Roles } from '@prisma/client';
import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OrderController } from './order.controller';
import { OrderValidation } from './order.validation';

const router = Router();

router.post(
  '/',
  auth(Roles.CUSTOMER),
  validateRequest(OrderValidation.create),
  OrderController.insertData
);
router.get('/', auth(Roles.ADMIN, Roles.CUSTOMER), OrderController.getAllData);
router.get(
  '/:id',
  auth(Roles.ADMIN, Roles.CUSTOMER),
  OrderController.getOneById
);
router.patch(
  '/:id',
  auth(Roles.ADMIN),
  validateRequest(OrderValidation.update),
  OrderController.updateOne
);
router.delete('/:id', auth(Roles.ADMIN), OrderController.deleteOne);

export const OrderRouter = router;
