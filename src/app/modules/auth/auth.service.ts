import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { JwtPayload, Secret } from "jsonwebtoken";

import config from "../../../config";
import ApiError from "../../errors/ApiError";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import prisma from "../../utils/prisma";

import { IAuth, IJwtPayload } from "./auth.interface";

const loginUser = async (payload: IAuth) => {
  const user = await prisma.user.findUnique({ where: { email: payload.email } });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "This user is not found!");
  }

  if (!user.isActive) {
    throw new ApiError(httpStatus.FORBIDDEN, "This user is not active!");
  }

  if (!(await bcrypt.compare(payload?.password, user?.password))) {
    throw new ApiError(httpStatus.FORBIDDEN, "Password does not match");
  }

  const nowUTC = new Date();
  const nowBDT = new Date(nowUTC.getTime() + 6 * 60 * 60 * 1000);
  const jwtPayload: IJwtPayload = {
    userId: user.id,
    name: user.name,
    email: user.email,
    isActive: user.isActive,
    lastLogin: nowBDT,
    role: user.role,
  };

  const token = jwtHelpers.generateToken(
    jwtPayload,
    config.jwt.jwt_secret as string,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.generateToken(
    jwtPayload,
    config.jwt.refresh_token_secret as string,
    config.jwt.refresh_token_expires_in as string
  );

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  return {
    token,
    refreshToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      isActive: user.isActive,
      role: user.role,
    },
  } as any; // Type assertion to avoid exactOptionalPropertyTypes issue
};

const refreshToken = async (token: string) => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(token, config.jwt.refresh_token_secret as Secret);
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid Refresh Token");
  }

  const { userId } = verifiedToken;

  const isUserExist = await prisma.user.findUnique({ where: { id: userId } });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  if (!isUserExist.isActive) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User is not active");
  }

  const jwtPayload: IJwtPayload = {
    userId: isUserExist.id,
    name: isUserExist.name,
    email: isUserExist.email,
    lastLogin: isUserExist.createdAt, // Assuming createdAt can be used as lastLogin if not explicitly tracked
    isActive: isUserExist.isActive,
    role: isUserExist.role,
  };

  const newAccessToken = jwtHelpers.generateToken(
    jwtPayload,
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  const { userId } = userData;
  const { oldPassword, newPassword } = payload;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  if (!user.isActive) {
    throw new ApiError(httpStatus.FORBIDDEN, "User account is inactive");
  }

  // Validate old password
  const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
  if (!isOldPasswordCorrect) {
    throw new ApiError(httpStatus.FORBIDDEN, "Incorrect old password");
  }

  // Hash and update the new password
  const hashedPassword = await bcrypt.hash(newPassword, 12); // Using 12 as salt rounds
  await prisma.user.update({ where: { id: userId }, data: { password: hashedPassword } });

  return { message: "Password changed successfully" };
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
};

// Improvement commit 38

// Improvement commit 93

// Improvement commit 104

// Improvement commit 155

// Improvement commit 156

// Improvement commit 179
