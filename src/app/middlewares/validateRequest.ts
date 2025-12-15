import { FastifyReply, FastifyRequest } from "fastify";
import { AnyZodObject } from "zod";

const validateRequest =
  (schema: AnyZodObject) =>
  async (request: FastifyRequest, _reply: FastifyReply) => {
    try {
      await schema.parseAsync({
        body: request.body,
      });
    } catch (err) {
      throw err;
    }
  };

export default validateRequest;
