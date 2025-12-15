import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";

import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { userServices } from "./user.service";

const createUser = catchAsync(async (request: FastifyRequest, reply: FastifyReply) => {
  const result = await userServices.createUser(request as any);
  sendResponse(reply, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "User created successfully!",
    data: result,
  });
});

const profileUpdate = catchAsync(async (request: FastifyRequest, reply: FastifyReply) => {
  const result = await userServices.updateProfile(request as any);
  sendResponse(reply, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Profile updated successfully!",
    data: result,
  });
});

const getMyProfile = catchAsync(async (request: FastifyRequest & { user?: any }, reply: FastifyReply) => {
  const user = request.user;
  const result = await userServices.getMyProfile(user);
  sendResponse(reply, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "My profile data fetched!",
    data: result,
  });
});

const getAllUsers = catchAsync(async (request: FastifyRequest, reply: FastifyReply) => {
  const result = await userServices.getAllUsers(request.query);
  sendResponse(reply, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "All users fetched successfully!",
    data: result,
  });
});

const updateUserRole = catchAsync(async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  const result = await userServices.updateUserRole(id, request.body as any);
  sendResponse(reply, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User role updated successfully!",
    data: result,
  });
});

const updateUserStatus = catchAsync(async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  const result = await userServices.updateUserStatus(id, request.body as any);
  sendResponse(reply, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User status updated successfully!",
    data: result,
  });
});

const getCustomerFollowedShops = catchAsync(
  async (request: FastifyRequest & { user?: any }, reply: FastifyReply) => {
    const user = request.user;
    const result = await userServices.getCustomerFollowedShops(user);
    sendResponse(reply, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Customer followed shops fetched successfully!",
      data: result,
    });
  }
);

export const userController = {
  createUser,
  profileUpdate,
  getMyProfile,
  getAllUsers,
  updateUserRole,
  updateUserStatus,
  getCustomerFollowedShops,
};

// Improvement commit 17
