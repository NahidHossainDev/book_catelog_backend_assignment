import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

const signUp = catchAsync(async (req: Request, res: Response) => {
  const data = await AuthService.signUp(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data,
    message: 'User register successfully!',
  });
});

const signIn = catchAsync(async (req: Request, res: Response) => {
  const data = await AuthService.signIn(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data,
    message: 'User sign in successfully!',
  });
});

export const AuthController = {
  signUp,
  signIn,
};
