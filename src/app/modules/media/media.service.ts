import { PrismaClient } from "@prisma/client";
import fs from "fs";
import httpStatus from "http-status";
import path from "path";
import ApiError from "../../errors/ApiError";
import { IMedia } from "./media.interface";

const prisma = new PrismaClient();
const UPLOADS_PATH = path.join(__dirname, "../../uploads");

// ================================
// Upload Multiple Media
// ================================
const uploadMultipleMedia = async (
  files: Express.Multer.File[],
  meta: Partial<IMedia>
) => {
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
        url: `/uploads/${meta.folder ? meta.folder + "/" : ""}${file.filename}`,
        folder: meta.folder,
        type: file.mimetype,
        size: file.size,
        uploadedBy: meta.uploadedBy || null,
        altText: meta.altText || "",
        title: meta.title || "",
        caption: meta.caption || "",
        description: meta.description || "",
      },
    });

    uploaded.push(media);
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
const getMediaById = async (id: string) => {
  const media = await prisma.media.findUnique({ where: { id } });
  if (!media) throw new ApiError(httpStatus.NOT_FOUND, "Media not found");
  return media;
};

// ================================
// Update Media Metadata
// ================================
const updateMedia = async (id: string, payload: Partial<IMedia>) => {
  const media = await prisma.media.findUnique({ where: { id } });
  if (!media) throw new ApiError(httpStatus.NOT_FOUND, "Media not found");

  // Rename file if the name changed
  if (payload.name && payload.name !== media.name) {
    const oldPath = path.join(UPLOADS_PATH, media.folder || "", media.name);
    const newPath = path.join(UPLOADS_PATH, media.folder || "", payload.name);
    if (fs.existsSync(oldPath)) fs.renameSync(oldPath, newPath);
    payload.url = `/uploads/${media.folder ? media.folder + "/" : ""}${
      payload.name
    }`;
  }

  return await prisma.media.update({
    where: { id },
    data: payload,
  });
};

// ================================
// Delete Media
// ================================
const deleteMedia = async (id: string) => {
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

// Commit 83
