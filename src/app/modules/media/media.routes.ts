import { Router } from "express";
import { actionLogger } from "../../middleware/actionLogger";
import auth from "../../middleware/auth";
import { upload } from "../../middleware/upload";
import { UserRole } from "../user/user.interface";
import { MediaControllers } from "./media.controller";

const router = Router();

// ======================
// List all media
// ======================
router.get("/", auth(UserRole.SUPER_ADMIN), MediaControllers.getAllMedia);

// ======================
// Upload multiple files
// ======================
router.post(
  "/upload",
  auth(
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.EDITOR,
    UserRole.PUBLISHER,
    UserRole.USER
  ),
  upload.array("files"),
  actionLogger,
  MediaControllers.uploadMultipleMedia
);

// ======================
// Get media by ID
// ======================
router.get("/:id", auth(UserRole.SUPER_ADMIN), MediaControllers.getMediaById);

// ======================
// Update media metadata
// ======================
router.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN),
  actionLogger,
  MediaControllers.updateMedia
);

// ======================
// Delete media by ID
// ======================
router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN),
  actionLogger,
  MediaControllers.deleteMedia
);

export const MediaRoutes = router;
