import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { FastifyRequest } from "fastify";
import httpStatus from "http-status";

import ApiError from "../../errors/ApiError";
import { IAuthUser } from "../../interfaces/common";
import { IFile } from "../../interfaces/file";
import prisma from "../../utils/prisma";

const createUser = async (request: FastifyRequest & { file?: IFile }): Promise<User> => {
  const file = request.file;
  const userData = request.body as any;

  // Check if user already exists
  const isUserExists = await prisma.user.findUnique({
    where: { email: userData.user.email },
  });
  if (isUserExists) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "A user with the provided email already exists."
    );
  }

  // Handle file upload if present
  // Note: profilePhoto not in schema, so file upload is skipped
  // File is saved locally via uploadSingle middleware

  // Hash the password
  const hashedPassword: string = await bcrypt.hash(userData.password, 12);

  // Prepare user data with all required fields
  const dataToCreate = {
    name: userData.user.name,
    email: userData.user.email,
    password: hashedPassword,
    role: userData.user.role,
  };

  // Create the user
  const result = await prisma.user.create({
    data: dataToCreate,
  });

  return result;
};

const updateProfile = async (request: FastifyRequest & { user?: IAuthUser; file?: IFile }) => {
  const file = request.file;
  const user = request.user;

  // Verify if the user exists
  if (!user?.email) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User email is required");
  }
  const isUser = await prisma.user.findUnique({
    where: { email: user.email },
  });
  if (!isUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  // Note: profilePhoto not in schema, so we skip it
  // File is saved locally via uploadSingle middleware

  // Update user profile (without profilePhoto as it's not in schema)
  const updatedProfile = await prisma.user.update({
    where: { id: isUser.id },
    data: {},
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
    },
  });

  return updatedProfile;
};

const getMyProfile = async (user: IAuthUser) => {
  if (!user?.email) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User email is required");
  }
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
    select: {
      email: true,
      name: true,
      role: true,
      isActive: true,
    },
  });

  return userInfo;
};

const getCustomerFollowedShops = async (_user: IAuthUser) => {
  // The User model in schema.prisma does not have a 'followedShops' field directly.
  // This function needs to be re-evaluated based on the actual schema or removed.
  // For now, returning an empty array or throwing an error.
  return [];
};

const getAllUsers = async (_query: any) => {
  const users = await prisma.user.findMany();
  return users;
};

const updateUserRole = async (id: string, payload: { role: string }) => {
  const user = await prisma.user.update({
    where: {
      id: Number(id), // Convert id to number
    },
    data: {
      role: payload.role as any, // Cast to any to match UserRole enum
    },
  });
  return user;
};

const updateUserStatus = async (id: string, payload: { isSuspended: boolean }) => {
  const user = await prisma.user.update({
    where: {
      id: Number(id), // Convert id to number
    },
    data: {
      isActive: !payload.isSuspended, // Assuming isSuspended means isActive is false
    },
  });
  return user;
};

export const userServices = {
  createUser,
  getMyProfile,
  updateProfile,
  getCustomerFollowedShops,
  getAllUsers,
  updateUserRole,
  updateUserStatus,
};

// Improvement commit 46

// Improvement commit 56

// Improvement commit 80

// Improvement commit 127

// Improvement commit 138

// Improvement commit 198
