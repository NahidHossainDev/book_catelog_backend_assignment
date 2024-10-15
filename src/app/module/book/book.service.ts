import { Book, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import {
  bookRelationalFields,
  bookRelationalFieldsMapper,
  bookSearchableFields,
} from './book.constants';

const insertData = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({ data });
  return result;
};

const getAllData = async (
  filters: any,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { limit, page, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...otherFilters } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: bookSearchableFields.map(key => ({
        [key]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(otherFilters).length > 0) {
    andConditions.push({
      AND: Object.entries(otherFilters).map(([key, value]) =>
        bookRelationalFields.includes(key)
          ? {
              [bookRelationalFieldsMapper[key]]: {
                id: value,
              },
            }
          : {
              [key]: {
                equals: value,
              },
            }
      ),
    });
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    where: whereConditions,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.book.count();
  return {
    data: result,
    meta: { total, page, limit },
  };
};

const getOneById = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findFirst({
    where: { id },
    include: { category: true },
  });
  return result;
};

const updateOne = async (id: string, data: Partial<Book>): Promise<Book> => {
  const result = await prisma.book.update({ where: { id }, data });
  return result;
};

const deleteOne = async (id: string): Promise<Book> => {
  const result = await prisma.book.delete({ where: { id } });
  return result;
};

export const BookService = {
  insertData,
  getAllData,
  getOneById,
  updateOne,
  deleteOne,
};
