import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";

import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { MediaServices } from "./media.service";

// Upload multiple files with metadata
const uploadMultipleMedia = catchAsync(async (request: FastifyRequest, reply: FastifyReply) => {
  const files = (request as any).files;
  const folder = (request.body as any).folder || "";

  if (!files || files.length === 0) {
    return sendResponse(reply, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: "No files uploaded",
    });
  }

  const uploaded = await MediaServices.uploadMultipleMedia(files, {
    folder,
    altText: (request.body as any).altText,
    title: (request.body as any).title,
    caption: (request.body as any).caption,
    description: (request.body as any).description,
    uploadedBy: (request.body as any).userId,
  });

  sendResponse(reply, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Files uploaded successfully",
    data: uploaded,
  });
});

// Get all media
const getAllMedia = catchAsync(async (_request: FastifyRequest, reply: FastifyReply) => {
  const data = await MediaServices.getAllMedia();
  sendResponse(reply, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "All media retrieved successfully",
    data,
  });
});

// Get media by ID
const getMediaById = catchAsync(async (request: FastifyRequest, reply: FastifyReply) => {
  const id = Number((request.params as any).id);
  const data = await MediaServices.getMediaById(id);
  sendResponse(reply, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Media retrieved successfully",
    data,
  });
});

// Update media metadata
const updateMedia = catchAsync(async (request: FastifyRequest, reply: FastifyReply) => {
  const id = Number((request.params as any).id);
  const data = await MediaServices.updateMedia(id, request.body as any);
  sendResponse(reply, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Media updated successfully",
    data,
  });
});

// Delete media
const deleteMedia = catchAsync(async (request: FastifyRequest, reply: FastifyReply) => {
  const id = Number((request.params as any).id);
  const data = await MediaServices.deleteMedia(id);
  sendResponse(reply, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Media deleted successfully",
    data,
  });
});

export const MediaControllers = {
  uploadMultipleMedia,
  getAllMedia,
  getMediaById,
  updateMedia,
  deleteMedia,
};

// Improvement commit 19

// Improvement commit 86

// Improvement commit 92

// Improvement commit 136
