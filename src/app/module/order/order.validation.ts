import { OrderStatus } from '@prisma/client';
import { z } from 'zod';

const create = z.object({
  body: z.object({
    orderedBooks: z.array(
      z.object({
        bookId: z.string({ required_error: 'Book id is required' }),
        quantity: z
          .number({ required_error: 'Quantity is required' })
          .min(1, 'Quantity can not be less then one'),
      }),
      { required_error: 'Book id is require to order' }
    ),
  }),
});

const update = z.object({
  body: z.object({
    status: z.enum(Object.values(OrderStatus) as [string, ...string[]], {
      required_error: 'Status is required',
    }),
  }),
});

export const OrderValidation = {
  create,
  update,
};
