import { UserRole } from "@prisma/client";
import { FastifyInstance } from "fastify";

import auth from "../../middlewares/auth";
import { upload } from "../../middlewares/upload";

import { MediaControllers } from "./media.controller";

const MediaRoutes = async (fastify: FastifyInstance) => {
  // List all media
  fastify.get(
    "/",
    {
      preHandler: auth(UserRole.SUPER_ADMIN),
    },
    MediaControllers.getAllMedia
  );

  // Upload multiple files
  fastify.post(
    "/upload",
    {
      preHandler: [
        auth(
          UserRole.SUPER_ADMIN,
          UserRole.ADMIN,
          UserRole.EDITOR,
          UserRole.PUBLISHER,
          UserRole.USER
        ),
        upload.array("files"),
      ],
    },
    MediaControllers.uploadMultipleMedia
  );

  // Get media by ID
  fastify.get(
    "/:id",
    {
      preHandler: auth(UserRole.SUPER_ADMIN),
    },
    MediaControllers.getMediaById
  );

  // Update media metadata
  fastify.patch(
    "/:id",
    {
      preHandler: auth(UserRole.SUPER_ADMIN),
    },
    MediaControllers.updateMedia
  );

  // Delete media by ID
  fastify.delete(
    "/:id",
    {
      preHandler: auth(UserRole.SUPER_ADMIN),
    },
    MediaControllers.deleteMedia
  );
};

export { MediaRoutes };

// Improvement commit 67

// Improvement commit 74

// Improvement commit 85

// Improvement commit 129

// Improvement commit 135

// Improvement commit 174

// Improvement commit 206
