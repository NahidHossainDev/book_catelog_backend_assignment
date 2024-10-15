import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { bookFilterableFields } from './book.constants';
import { BookService } from './book.service';

const insertData = catchAsync(async (req: Request, res: Response) => {
  const data = await BookService.insertData(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data,
    message: 'Book created successfully!',
  });
});

const getAllData = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);
  const otherFilters = pick(req.query, paginationFields);
  const data = await BookService.getAllData(filters, otherFilters);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data,
    message: 'All Book retrieved successfully!',
  });
});

const getOneById = catchAsync(async (req: Request, res: Response) => {
  const data = await BookService.getOneById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data,
    message: 'Book get successfully!',
  });
});

const updateOne = catchAsync(async (req: Request, res: Response) => {
  const data = await BookService.updateOne(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data,
    message: 'Book updated successfully!',
  });
});

const deleteOne = catchAsync(async (req: Request, res: Response) => {
  const data = await BookService.deleteOne(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data,
    message: 'Book deleted successfully!',
  });
});

export const BookController = {
  insertData,
  getAllData,
  getOneById,
  updateOne,
  deleteOne,
};
