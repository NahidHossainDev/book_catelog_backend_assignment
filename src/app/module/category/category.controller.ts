import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { categoryFilterableFields } from './category.constants';
import { CategoryService } from './category.service';

const insertData = catchAsync(async (req: Request, res: Response) => {
  const data = await CategoryService.insertData(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data,
    message: 'Category created successfully!',
  });
});

const getAllData = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.params, categoryFilterableFields);
  const otherFilters = pick(req.params, paginationFields);
  const data = await CategoryService.getAllData(filters, otherFilters);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data,
    message: 'All Category retrieved successfully!',
  });
});

const getOneById = catchAsync(async (req: Request, res: Response) => {
  const data = await CategoryService.getOneById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data,
    message: 'Category get successfully!',
  });
});

const updateOne = catchAsync(async (req: Request, res: Response) => {
  const data = await CategoryService.updateOne(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data,
    message: 'Category updated successfully!',
  });
});

const deleteOne = catchAsync(async (req: Request, res: Response) => {
  const data = await CategoryService.deleteOne(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data,
    message: 'Category deleted successfully!',
  });
});

export const CategoryController = {
  insertData,
  getAllData,
  getOneById,
  updateOne,
  deleteOne,
};
