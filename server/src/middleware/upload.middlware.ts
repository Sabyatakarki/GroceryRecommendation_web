import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import { Request } from "express";

const createStorage = (folderName: string, prefix: string) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(
        __dirname,
        `../../public/${folderName}`
      );

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      cb(null, uploadPath);
    },

    filename: (req, file, cb) => {
      const uniqueId = uuidv4();
      const extension = path.extname(file.originalname);

      cb(null, `${prefix}-${uniqueId}${extension}`);
    },
  });
};

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed."));
  }
};

const profileUpload = multer({
  storage: createStorage("profile_pictures", "profile"),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter,
});

const productUpload = multer({
  storage: createStorage("products", "product"),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter,
});

export const uploads = {
  profile: {
    single: profileUpload.single("profileImage"),
    array: (fieldName: string, maxCount: number) =>
      profileUpload.array(fieldName, maxCount),
  },

  product: {
    single: productUpload.single("productImage"),
    array: (fieldName: string, maxCount: number) =>
      productUpload.array(fieldName, maxCount),
  },
};