import fs from "fs";
import path from "path";

import { MultipartFile } from "@fastify/multipart";



const saveFile = async (
  file: MultipartFile,
  fileDir: string = ""
): Promise<{ filename: string; path: string; mimetype: string; size: number }> => {
  const uploadsPath = path.join(process.cwd(), "uploads");
  const uploadFolder = path.join(uploadsPath, fileDir);

  if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, { recursive: true });
  }

  const ext = path.extname(file.filename || "");
  const baseName = path.basename(file.filename || "", ext);
  let finalName = `${baseName}${ext}`;
  let counter = 1;

  while (fs.existsSync(path.join(uploadFolder, finalName))) {
    finalName = `${baseName}${counter}${ext}`;
    counter++;
  }

  const filePath = path.join(uploadFolder, finalName);
  const buffer = await file.toBuffer();
  fs.writeFileSync(filePath, buffer);

  return {
    filename: finalName,
    path: filePath,
    mimetype: file.mimetype || "",
    size: buffer.length,
  };
};

const uploadSingle = (fieldName: string = "file") => {
  return async (request: any, _reply: any) => {
    const data = await request.saveRequestFiles();
    const file = data[0];

    if (file) {
      const fileDir = request.body?.fileDir || "";
      const savedFile = await saveFile(file, fileDir);
      request.file = {
        ...savedFile,
        originalname: file.filename,
        fieldname: fieldName,
      };
    }
  };
};

const uploadArray = (fieldName: string = "files") => {
  return async (request: any, _reply: any) => {
    const data = await request.saveRequestFiles();
    const files: any[] = [];

    for (const file of data) {
      if (file.fieldname === fieldName) {
        const fileDir = request.body?.fileDir || "";
        const savedFile = await saveFile(file, fileDir);
        files.push({
          ...savedFile,
          originalname: file.filename,
          fieldname: file.fieldname,
        });
      }
    }

    request.files = files;
  };
};

export const fileUploader = {
  uploadSingle,
  uploadArray,
};

// Improvement commit 1

// Improvement commit 71

// Improvement commit 178
