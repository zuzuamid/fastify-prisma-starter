import { UserRole } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import { fileUploader } from "../../helpers/fileUploader";
import auth from "../../middlewares/auth";
import { userController } from "./user.controller";
import { userValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/create-user",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createUser.parse(JSON.parse(req.body.data));
    return userController.createUser(req, res, next);
  }
);
router.put(
  "/update-profile",
  fileUploader.upload.single("file"),
  auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.VENDOR),
  (req: Request, res: Response, next: NextFunction) => {
    return userController.profileUpdate(req, res, next);
  }
);
router.get(
  "/me",
  auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.VENDOR),
  userController.getMyProfile
);
router.get("/", auth(UserRole.ADMIN), userController.getAllUsers);
router.put(
  "/update-role/:id",
  auth(UserRole.ADMIN),
  userController.updateUserRole
);
router.put(
  "/update-status/:id",
  auth(UserRole.ADMIN),
  userController.updateUserStatus
);
router.get(
  "/customer/followed-shops",
  auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.VENDOR),
  userController.getCustomerFollowedShops
);
export const userRoutes = router;
