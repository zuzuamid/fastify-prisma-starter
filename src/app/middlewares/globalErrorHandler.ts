import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import httpStatus from "http-status";

const globalErrorHandler = (
  error: FastifyError,
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  reply.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).send({
    success: false,
    message: error.message || "Something went wrong!",
    error,
  });
};

export default globalErrorHandler;

// Improvement commit 63
