import { Order, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import {
  orderRelationalFields,
  orderRelationalFieldsMapper,
  orderSearchableFields,
} from './order.constants';
import { IOrderPayload } from './order.interface';

const insertData = async (
  userId: string,
  payload: IOrderPayload
): Promise<any> => {
  const createdOrder = await prisma.$transaction(async t => {
    const order = await t.order.create({
      data: {
        userId,
      },
    });
    if (!order)
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Order detail could not create'
      );

    await t.orderDetails.createMany({
      data: payload.orderedBooks.map(item => ({
        ...item,
        orderId: order.id,
      })),
    });

    return order;
  });
  const result = await prisma.order.findUnique({
    where: { id: createdOrder.id },
    include: { OrderDetails: true, user: true },
  });
  return result;
};

const getAllData = async (
  filters: any,
  options: IPaginationOptions
): Promise<IGenericResponse<Order[]>> => {
  const { limit, page, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...otherFilters } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: orderSearchableFields.map(key => ({
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
        orderRelationalFields.includes(key)
          ? {
              [orderRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.OrderWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.order.findMany({
    where: whereConditions,
    include: {
      user: true,
    },
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.order.count();
  return {
    data: result,
    meta: { total, page, limit },
  };
};

const getOneById = async (id: string): Promise<Order | null> => {
  const result = await prisma.order.findFirst({
    where: { id },
    include: {
      OrderDetails: true,
      user: true,
    },
  });
  return result;
};

const updateOne = async (id: string, data: Partial<Order>): Promise<Order> => {
  const result = await prisma.order.update({
    where: { id },
    data,
    include: {
      OrderDetails: true,
      user: true,
    },
  });
  return result;
};

const deleteOne = async (id: string): Promise<Order> => {
  const result = await prisma.order.delete({
    where: { id },
    include: {
      OrderDetails: true,
      user: true,
    },
  });
  return result;
};

export const OrderService = {
  insertData,
  getAllData,
  getOneById,
  updateOne,
  deleteOne,
};
