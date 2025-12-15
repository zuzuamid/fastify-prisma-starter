import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import formbody from "@fastify/formbody";
import helmet from "@fastify/helmet";
import multipart from "@fastify/multipart";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import httpStatus from "http-status";

import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import router from "./app/routes";

const app = async (fastify: FastifyInstance) => {
  // Register plugins
  await fastify.register(cors, {
    origin: ["http://localhost:5173", "https://altium-medicare.vercel.app"],
    credentials: true,
  });

  await fastify.register(formbody);
  await fastify.register(multipart, {
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB
    },
  });
  await fastify.register(cookie);
  await fastify.register(helmet);

  // Root route
  fastify.get("/", async (_request: FastifyRequest, _reply: FastifyReply) => {
    return {
      Message: "Altium Medicare server..",
    };
  });

  // API routes
  await fastify.register(router, { prefix: "/api/v1" });

  // 404 handler
  fastify.setNotFoundHandler(
    async (request: FastifyRequest, reply: FastifyReply) => {
      reply.status(httpStatus.NOT_FOUND).send({
        success: false,
        message: "API NOT FOUND!",
        status: httpStatus.NOT_FOUND,
        error: {
          path: request.url,
          message: "Your requested path is not found!",
        },
      });
    }
  );

  // Global error handler
  fastify.setErrorHandler(globalErrorHandler);
};

export default app;
