import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { JwtPayload, Secret } from "jsonwebtoken";
import mongoose from "mongoose";
import config from "../../config";
import AppError from "../../errors/appError";
import User from "../user/user.model";
import { IAuth, IJwtPayload } from "./auth.interface";
import { createToken, verifyToken } from "./auth.utils";

const loginUser = async (payload: IAuth) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const user = await User.findOne({ email: payload.email }).session(session);
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, "This user is not found!");
    }

    if (!user.is_active) {
      throw new AppError(StatusCodes.FORBIDDEN, "This user is not active!");
    }

    if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
      throw new AppError(StatusCodes.FORBIDDEN, "Password does not match");
    }

    const nowUTC = new Date();
    const nowBDT = new Date(nowUTC.getTime() + 6 * 60 * 60 * 1000);
    const jwtPayload: IJwtPayload = {
      user_id: user._id as string,
      name: user.name as string,
      email: user.email as string,
      is_active: user.is_active,
      last_login: nowBDT,
      profile_photo: user.profile_photo as string,
      role: user.role,
    };

    const token = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string
    );

    const refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_refresh_expires_in as string
    );

    const updateUserInfo = await User.findByIdAndUpdate(
      user._id,
      { clientInfo: payload.clientInfo, last_login: Date.now() },
      { new: true, session }
    );

    await session.commitTransaction();

    return {
      token,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        is_active: user.is_active,
        role: user.role,
        profile_photo: user.profile_photo,
      },
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const refreshToken = async (token: string) => {
  let verifiedToken = null;
  try {
    verifiedToken = verifyToken(token, config.jwt_refresh_secret as Secret);
  } catch (err) {
    throw new AppError(StatusCodes.FORBIDDEN, "Invalid Refresh Token");
  }

  const { user_id } = verifiedToken;

  const isUserExist = await User.findById(user_id);
  if (!isUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, "User does not exist");
  }

  if (!isUserExist.is_active) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User is not active");
  }

  const jwtPayload: IJwtPayload = {
    user_id: isUserExist._id as string,
    name: isUserExist.name as string,
    email: isUserExist.email as string,
    last_login: isUserExist.last_login,
    is_active: isUserExist.is_active,
    profile_photo: isUserExist.profile_photo,
    role: isUserExist.role,
  };

  const newAccessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as Secret,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  const { user_id } = userData;
  const { oldPassword, newPassword } = payload;

  const user = await User.findOne({ _id: user_id });
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  }
  if (!user.is_active) {
    throw new AppError(StatusCodes.FORBIDDEN, "User account is inactive");
  }

  // Validate old password
  const isOldPasswordCorrect = await User.isPasswordMatched(
    oldPassword,
    user.password
  );
  if (!isOldPasswordCorrect) {
    throw new AppError(StatusCodes.FORBIDDEN, "Incorrect old password");
  }

  // Hash and update the new password
  const hashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds)
  );
  await User.updateOne({ _id: user_id }, { password: hashedPassword });

  return { message: "Password changed successfully" };
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
};
