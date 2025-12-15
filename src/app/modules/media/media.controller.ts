import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { MediaServices } from "./media.service";

// Upload multiple files with metadata
const uploadMultipleMedia = catchAsync(async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  const folder = req.body.folder || "";

  if (!files || files.length === 0) {
    return sendResponse(res, {
      status: 400,
      success: false,
      message: "No files uploaded",
    });
  }

  const uploaded = await MediaServices.uploadMultiple(files, {
    folder,
    altText: req.body.altText,
    title: req.body.title,
    caption: req.body.caption,
    description: req.body.description,
    uploadedBy: req.body.userId,
  });

  sendResponse(res, {
    status: 201,
    success: true,
    message: "Files uploaded successfully",
    data: uploaded,
  });
});

// Get all media
const getAllMedia = catchAsync(async (req: Request, res: Response) => {
  const data = await MediaServices.getAll();
  sendResponse(res, {
    status: 200,
    success: true,
    message: "All media retrieved successfully",
    data,
  });
});

// Get media by ID
const getMediaById = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const data = await MediaServices.getById(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Media retrieved successfully",
    data,
  });
});

// Update media metadata
const updateMedia = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const data = await MediaServices.update(id, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Media updated successfully",
    data,
  });
});

// Delete media
const deleteMedia = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const data = await MediaServices.delete(id);
  sendResponse(res, {
    status: 200,
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

// Commit 28

// Commit 48
