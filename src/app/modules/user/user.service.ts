import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { Request } from "express";
import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import { fileUploader } from "../../helpers/fileUploader";
import { IAuthUser } from "../../interfaces/common";
import { IFile } from "../../interfaces/file";
import prisma from "../../utils/prisma";

const createUser = async (req: Request): Promise<User> => {
  const file = req.file as IFile;

  // Check if user already exists
  const isUserExists = await prisma.user.findUnique({
    where: { email: req.body.user.email },
  });
  if (isUserExists) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "A user with the provided email already exists."
    );
  }

  // Handle file upload if present
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.user.profilePhoto = uploadToCloudinary?.secure_url;
  }

  // Hash the password
  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);

  // Prepare user data with all required fields
  const userData = {
    name: req.body.user.name,
    email: req.body.user.email,
    password: hashedPassword,
    role: req.body.user.role,
    profilePhoto: req.body.user.profilePhoto || null,
  };

  // Create the user
  const result = await prisma.user.create({
    data: userData,
  });

  return result;
};
const updateProfile = async (req: any) => {
  const file = req.file as IFile;

  // Verify if the user exists
  const isUser = await prisma.user.findUnique({
    where: { email: req?.user.email },
  });
  if (!isUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  let profilePhoto: string | null = isUser.profilePhoto || null;

  if (file) {
    try {
      const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
      profilePhoto = uploadToCloudinary?.secure_url ?? isUser.profilePhoto;
    } catch (error) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "File upload failed"
      );
    }
  }

  // Update user profile
  const updatedProfile = await prisma.user.update({
    where: { id: isUser.id },
    data: { profilePhoto },
    select: {
      profilePhoto: true,
    },
  });

  return updatedProfile;
};

const getMyProfile = async (user: IAuthUser) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
    select: {
      email: true,
      profilePhoto: true,
      name: true,
      role: true,
      status: true,
      shops: true,
      followedShops: true,
      reviews: true,
      orders: true,
      Product: true,
    },
  });

  return userInfo;
};

const getCustomerFollowedShops = async (req: any) => {
  const user = await prisma.user.findUnique({
    where: { email: req?.user?.email },
    select: {
      followedShops: {
        include: {
          products: true,
        },
      },
    },
  });
  return user?.followedShops;
};
const getAllUsers = async (req: any) => {
  const user = await prisma.user.findMany();
  return user;
};
const updateUserRole = async (req: any) => {
  const user = await prisma.user.update({
    where: {
      id: req?.params?.id,
    },
    data: {
      role: req.body.role,
    },
  });
  return user;
};
const updateUserStatus = async (req: any) => {
  const user = await prisma.user.update({
    where: {
      id: req?.params?.id,
    },
    data: {
      isSuspended: req.body.isSuspended,
      status: req.body.isSuspended ? "BLOCKED" : "ACTIVE",
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
