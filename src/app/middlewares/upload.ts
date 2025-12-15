import fs from "fs";
import multer from "multer";
import path from "path";

const uploadsPath = path.join(__dirname, "../../uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fileDir = req.body.fileDir || "";
    const uploadFolder = path.join(uploadsPath, fileDir);

    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder, { recursive: true });
    }

    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    const fileDir = req.body.fileDir || "";
    const uploadFolder = path.join(uploadsPath, fileDir);

    const ext = path.extname(file.originalname);
    let baseName = path.basename(file.originalname, ext);
    let finalName = `${baseName}${ext}`;
    let counter = 1;

    // Increment filename if it already exists
    while (fs.existsSync(path.join(uploadFolder, finalName))) {
      finalName = `${baseName}${counter}${ext}`;
      counter++;
    }

    cb(null, finalName);
  },
});

export const upload = multer({ storage });
