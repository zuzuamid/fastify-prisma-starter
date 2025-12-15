import { FastifyInstance } from "fastify";

import { AuthRoutes } from "../modules/auth/auth.routes";
import { MediaRoutes } from "../modules/media/media.routes";
import { userRoutes } from "../modules/user/user.routes";

const router = async (fastify: FastifyInstance) => {
  fastify.register(userRoutes, { prefix: "/user" });
  fastify.register(AuthRoutes, { prefix: "/auth" });
  fastify.register(MediaRoutes, { prefix: "/media" });
};

export default router;
