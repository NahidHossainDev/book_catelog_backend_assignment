import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { orderFilterableFields } from './order.constants';
import { OrderService } from './order.service';

const insertData = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  console.log(user);

  const data = await OrderService.insertData(user?.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data,
    message: 'Order created successfully!',
  });
});

const getAllData = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, orderFilterableFields);
  const otherFilters = pick(req.query, paginationFields);
  const data = await OrderService.getAllData(filters, otherFilters);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data,
    message: 'All Order retrieved successfully!',
  });
});

const getOneById = catchAsync(async (req: Request, res: Response) => {
  const data = await OrderService.getOneById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data,
    message: 'Order get successfully!',
  });
});

const updateOne = catchAsync(async (req: Request, res: Response) => {
  const data = await OrderService.updateOne(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data,
    message: 'Order updated successfully!',
  });
});

const deleteOne = catchAsync(async (req: Request, res: Response) => {
  const data = await OrderService.deleteOne(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data,
    message: 'Order deleted successfully!',
  });
});

export const OrderController = {
  insertData,
  getAllData,
  getOneById,
  updateOne,
  deleteOne,
};
