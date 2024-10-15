import express from 'express';
import { AuthRouter } from '../module/auth/auth.route';
import { CategoryRouter } from '../module/category/category.route';
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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
