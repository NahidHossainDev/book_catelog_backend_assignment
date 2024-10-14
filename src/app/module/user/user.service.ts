import { Prisma, User } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { userSearchableFields } from './user.constants';

const insertData = async (data: User): Promise<User> => {
  const result = await prisma.user.create({ data });
  return result;
};

const getAllData = async (
  filters: any,
  options: IPaginationOptions
): Promise<IGenericResponse<User[]>> => {
  const { limit, page, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...otherFilters } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map(key => ({
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

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.user.findMany({
    where: whereConditions,

    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.user.count();
  return {
    data: result,
    meta: { total, page, limit },
  };
};

const getOneById = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findFirst({ where: { id } });
  return result;
};

const updateOne = async (id: string, data: Partial<User>): Promise<User> => {
  const result = await prisma.user.update({ where: { id }, data });
  return result;
};

const deleteOne = async (id: string): Promise<User> => {
  const result = await prisma.user.delete({ where: { id } });
  return result;
};

export const UserService = {
  insertData,
  getAllData,
  getOneById,
  updateOne,
  deleteOne,
};
