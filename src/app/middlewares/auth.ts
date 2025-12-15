import { FastifyReply, FastifyRequest } from "fastify";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";

import config from "../../config";
import ApiError from "../errors/ApiError";
import { jwtHelpers } from "../helpers/jwtHelpers";

const auth = (...roles: string[]) => {
  return async (
    request: FastifyRequest & { user?: any },
    _reply: FastifyReply
  ) => {
    try {
      const token = request.headers.authorization;

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized!");
      }
      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.jwt_secret as Secret
      );

      request.user = verifiedUser;

      if (roles.length && !roles.includes(verifiedUser["role"])) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden!");
      }
    } catch (err) {
      throw err;
    }
  };
};

export default auth;

// Improvement commit 55

// Improvement commit 61

// Improvement commit 105
