import fs from "fs";
import path from "path";

import { PrismaClient } from "@prisma/client";
import httpStatus from "http-status";


import ApiError from "../../errors/ApiError";
import { IFile } from "../../interfaces/file";

import { IMedia } from "./media.interface";

const prisma = new PrismaClient();
const UPLOADS_PATH = path.join(__dirname, "../../uploads");

// ================================
// Upload Multiple Media
// ================================
const uploadMultipleMedia = async (
  files: IFile[],
  meta: Partial<IMedia>
): Promise<IMedia[]> => {
  if (!files || files.length === 0)
    throw new ApiError(httpStatus.BAD_REQUEST, "No files uploaded");

  const uploaded: IMedia[] = [];
  const folderPath = meta.folder
    ? path.join(UPLOADS_PATH, meta.folder)
    : UPLOADS_PATH;

  // Create folder if it doesn't exist
  if (meta.folder && !fs.existsSync(folderPath))
    fs.mkdirSync(folderPath, { recursive: true });

  for (const file of files) {
    const targetPath = path.join(folderPath, file.filename);
    fs.renameSync(file.path, targetPath); // Move uploaded file to target folder

    const media = await prisma.media.create({
      data: {
        name: file.filename,
        url: `/uploads/${meta.folder ? `${meta.folder  }/` : ""}${file.filename}`,
        folder: meta.folder || null,
        type: file.mimetype,
        size: file.size,
        uploadedBy: meta.uploadedBy || null,
        altText: meta.altText || null,
        title: meta.title || null,
        caption: meta.caption || null,
        description: meta.description || null,
      },
    });

    uploaded.push({
      id: media.id,
      name: media.name,
      url: media.url,
      folder: media.folder ?? undefined,
      type: media.type,
      size: media.size,
      uploadedBy: media.uploadedBy ?? undefined,
      altText: media.altText ?? undefined,
      title: media.title ?? undefined,
      caption: media.caption ?? undefined,
      description: media.description ?? undefined,
    } as IMedia);
  }

  return uploaded;
};

// ================================
// Get All Media
// ================================
const getAllMedia = async () => {
  return await prisma.media.findMany({
    orderBy: { createdAt: "desc" },
  });
};

// ================================
// Get Media by ID
// ================================
const getMediaById = async (id: number) => {
  const media = await prisma.media.findUnique({ where: { id } });
  if (!media) throw new ApiError(httpStatus.NOT_FOUND, "Media not found");
  return media;
};

// ================================
// Update Media Metadata
// ================================
const updateMedia = async (id: number, payload: Partial<IMedia>) => {
  const media = await prisma.media.findUnique({ where: { id } });
  if (!media) throw new ApiError(httpStatus.NOT_FOUND, "Media not found");

  // Rename file if the name changed
  if (payload.name && payload.name !== media.name) {
    const oldPath = path.join(UPLOADS_PATH, media.folder || "", media.name);
    const newPath = path.join(UPLOADS_PATH, media.folder || "", payload.name);
    if (fs.existsSync(oldPath)) fs.renameSync(oldPath, newPath);
    payload.url = `/uploads/${media.folder ? `${media.folder  }/` : ""}${payload.name}`;
  }

  return await prisma.media.update({
    where: { id },
    data: payload as any, // Cast to any to allow partial updates
  });
};

// ================================
// Delete Media
// ================================
const deleteMedia = async (id: number) => {
  const media = await prisma.media.findUnique({ where: { id } });
  if (!media) throw new ApiError(httpStatus.NOT_FOUND, "Media not found");

  const filePath = path.join(UPLOADS_PATH, media.folder || "", media.name);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  await prisma.media.delete({ where: { id } });
  return { message: "Media deleted successfully" };
};

// ================================
// Export MediaServices
// ================================
export const MediaServices = {
  uploadMultipleMedia,
  getAllMedia,
  getMediaById,
  updateMedia,
  deleteMedia,
};

// Improvement commit 7

// Improvement commit 13

// Improvement commit 139
