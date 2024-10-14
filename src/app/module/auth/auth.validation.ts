import { Roles } from '@prisma/client';
import { z } from 'zod';

const signUp = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email({ message: 'Email must be an valid email' }),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, 'Password must be minimum 6 character long'),
    role: z.enum(Object.values(Roles) as [string, ...string[]], {}),
    contactNo: z.string({ required_error: 'Contact number is required' }),
  }),
});

const signIn = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email({ message: 'Email must be an valid email' }),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, 'Password must be minimum 6 character long'),
  }),
});

export const AuthValidation = {
  signUp,
  signIn,
};
