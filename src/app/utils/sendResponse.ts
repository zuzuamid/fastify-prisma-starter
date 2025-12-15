import { FastifyReply } from "fastify";

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data?: T;
};

const sendResponse = <T>(reply: FastifyReply, data: TResponse<T>) => {
  reply.status(data?.statusCode).send({
    success: data.success,
    statusCode: data?.statusCode,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;

// Improvement commit 11

// Improvement commit 24

// Improvement commit 48
