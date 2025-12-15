import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";

import config from "../../../config";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { AuthService } from "./auth.service";

const loginUser = catchAsync(async (request: FastifyRequest, reply: FastifyReply) => {
  const { refreshToken, ...result } = await AuthService.loginUser(request.body as any);

  reply.setCookie("refreshToken", refreshToken, {
    secure: config.env === "production",
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(reply, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User logged in successfully!",
    data: result,
  });
});

const refreshToken = catchAsync(async (request: FastifyRequest, reply: FastifyReply) => {
  const { authorization } = request.headers;

  const result = await AuthService.refreshToken(authorization as string);

  sendResponse(reply, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User logged in successfully!",
    data: result,
  });
});

// change password
const changePassword = catchAsync(async (request: FastifyRequest & { user?: any }, reply: FastifyReply) => {
  const user = request.user;
  const payload = request.body;

  await AuthService.changePassword(user, payload as any);

  sendResponse(reply, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Password changed successfully!",
    data: null,
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
};
