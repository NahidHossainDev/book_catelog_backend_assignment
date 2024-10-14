import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { userFilterableFields } from './user.constants';
import { UserService } from './user.service';

const insertData = catchAsync(async (req: Request, res: Response) => {
  const data = await UserService.insertData(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data,
    message: 'User created successfully!',
  });
});

const getAllData = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.params, userFilterableFields);
  const otherFilters = pick(req.params, paginationFields);
  const data = await UserService.getAllData(filters, otherFilters);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data,
    message: 'All user retrieved successfully!',
  });
});

const getOneById = catchAsync(async (req: Request, res: Response) => {
  const data = await UserService.getOneById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data,
    message: 'User get successfully!',
  });
});

const updateOne = catchAsync(async (req: Request, res: Response) => {
  const data = await UserService.updateOne(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data,
    message: 'User updated successfully!',
  });
});

const deleteOne = catchAsync(async (req: Request, res: Response) => {
  const data = await UserService.deleteOne(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data,
    message: 'User deleted successfully!',
  });
});

export const UserController = {
  insertData,
  getAllData,
  getOneById,
  updateOne,
  deleteOne,
};
