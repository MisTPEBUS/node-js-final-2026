import multer from "multer";
import { BadRequestError } from "../utils/AppError.js";

const MAX_IMAGE_SIZE_BYTES = 2 * 1024 * 1024;
const ALLOWED_IMAGE_MIME_TYPES = new Set(["image/jpeg", "image/png"]);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_IMAGE_SIZE_BYTES,
    files: 1,
  },
  fileFilter(req, file, callback) {
    if (!ALLOWED_IMAGE_MIME_TYPES.has(file.mimetype)) {
      return callback(new BadRequestError("僅支援 JPG、PNG 圖片"));
    }

    return callback(null, true);
  },
});

const uploadSingleImage = (req, res, next) => {
  upload.single("file")(req, res, (error) => {
    if (!error) {
      return next();
    }

    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        return next(new BadRequestError("圖片大小不得超過 2MB"));
      }

      if (error.code === "LIMIT_UNEXPECTED_FILE") {
        return next(new BadRequestError("檔案欄位名稱必須為 file"));
      }

      return next(new BadRequestError("圖片上傳格式錯誤"));
    }

    return next(error);
  });
};

export { MAX_IMAGE_SIZE_BYTES };
export default uploadSingleImage;
