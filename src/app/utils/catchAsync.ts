import { FastifyReply, FastifyRequest } from "fastify";

export const catchAsync =
  (fn: (request: FastifyRequest, reply: FastifyReply) => Promise<any>) =>
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await fn(request, reply);
    } catch (error) {
      throw error;
    }
  };
