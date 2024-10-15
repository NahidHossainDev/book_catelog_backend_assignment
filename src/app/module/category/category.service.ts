import { Category, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { categorySearchableFields } from './category.constants';

const insertData = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({ data });
  return result;
};

const getAllData = async (
  filters: any,
  options: IPaginationOptions
): Promise<IGenericResponse<Category[]>> => {
  const { limit, page, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...otherFilters } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: categorySearchableFields.map(key => ({
        [key]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(otherFilters).length > 0) {
    andConditions.push({
      AND: Object.entries(otherFilters).map(([key, value]) => ({
        [key]: {
          equals: value,
        },
      })),
    });
  }

  const whereConditions: Prisma.CategoryWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.category.findMany({
    where: whereConditions,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.category.count();
  return {
    data: result,
    meta: { total, page, limit },
  };
};

const getOneById = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findFirst({
    where: { id },
    include: { Book: true },
  });
  return result;
};

const updateOne = async (
  id: string,
  data: Partial<Category>
): Promise<Category> => {
  const result = await prisma.category.update({ where: { id }, data });
  return result;
};

const deleteOne = async (id: string): Promise<Category> => {
  const result = await prisma.category.delete({ where: { id } });
  return result;
};

export const CategoryService = {
  insertData,
  getAllData,
  getOneById,
  updateOne,
  deleteOne,
};
