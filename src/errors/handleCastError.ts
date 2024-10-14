import { Prisma } from '@prisma/client';
import { IGenericErrorMessage } from '../interfaces/error';

const handleCastError = (error: Prisma.PrismaClientKnownRequestError) => {
  let message = 'An unexpected error occurred';
  const errors: IGenericErrorMessage[] = [];
  const statusCode = 400;

  if (error.code === 'P2002') {
    message = 'Unique constraint violation';
    const field = (error.meta?.target as string[])?.join(', ') || 'field';
    errors.push({
      path: field,
      message: `${
        field.charAt(0).toUpperCase() + field.slice(1)
      } already exists`,
    });
  } else if (error.code === 'P2003') {
    message = 'Foreign key constraint violation';
    errors.push({
      path: '',
      message,
    });
  } else if (error.code === 'P2004') {
    message = 'Constraint failed on a database field';
    errors.push({
      path: '',
      message,
    });
  } else if (error.code === 'P2025') {
    message = (error.meta?.cause as string) || 'Record not found';
    errors.push({
      path: '',
      message,
    });
  } else if (error.code === 'P2024') {
    message = 'Timeout error: Query execution took too long';
    errors.push({
      path: '',
      message,
    });
  } else {
    errors.push({
      path: '',
      message,
    });
  }

  return {
    statusCode,
    message: 'Cast Error',
    errorMessages: errors,
  };
};

export default handleCastError;
