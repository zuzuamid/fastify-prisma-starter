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

// Improvement commit 6

// Improvement commit 41

// Improvement commit 60

// Improvement commit 62

// Improvement commit 101

// Improvement commit 128

// Improvement commit 160
