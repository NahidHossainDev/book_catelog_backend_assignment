import { User } from '@prisma/client';
import bcrpt from 'bcrypt';
import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { prisma } from '../../../shared/prisma';
import { ISignInPayload } from './auth.interface';

const signUp = async (data: User): Promise<Omit<User, 'password'>> => {
  data.password = await bcrpt.hash(
    data.password,
    Number(config.bycrypt_salt_rounds)
  );
  const result = await prisma.user.create({
    data,
  });

  delete result.password;

  return result;
};

const signIn = async (data: ISignInPayload): Promise<{ token: string }> => {
  const result = await prisma.user.findUnique({
    where: {
      email: data?.email,
    },
  });

  if (!result) throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  const { password, ...userData } = result;

  const isPassMatch = await bcrpt.compare(data?.password, password);
  if (!isPassMatch)
    throw new ApiError(httpStatus.NOT_FOUND, 'Password does not match!');

  console.log(config.jwt.secret);

  const token = jwtHelpers.createToken(userData);

  return { token };
};

export const AuthService = {
  signUp,
  signIn,
};
