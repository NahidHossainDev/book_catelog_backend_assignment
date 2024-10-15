import express from 'express';
import { AuthRouter } from '../module/auth/auth.route';
import { BookRouter } from '../module/book/book.route';
import { CategoryRouter } from '../module/category/category.route';
import { OrderRouter } from '../module/order/order.route';
import { UserRouter } from '../module/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRouter,
  },
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/category',
    route: CategoryRouter,
  },
  {
    path: '/book',
    route: BookRouter,
  },
  {
    path: '/order',
    route: OrderRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
