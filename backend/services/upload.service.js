import { randomUUID } from "node:crypto";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { fileTypeFromBuffer } from "file-type";
import config from "../config/index.js";
import { AppError, BadRequestError } from "../utils/AppError.js";

const ALLOWED_IMAGE_TYPES = Object.freeze({
  "image/jpeg": "jpg",
  "image/png": "png",
});

let r2Client;

function getR2Client() {
  const r2Config = config.cloudflareR2;

  if (!r2Config.enabled) {
    throw new AppError(503, "圖片上傳服務尚未設定");
  }

  if (!r2Client) {
    r2Client = new S3Client({
      region: "auto",
      endpoint: r2Config.endpoint,
      requestChecksumCalculation: "WHEN_REQUIRED",
      responseChecksumValidation: "WHEN_REQUIRED",
      credentials: {
        accessKeyId: r2Config.accessKeyId,
        secretAccessKey: r2Config.secretAccessKey,
      },
    });
  }

  return r2Client;
}

const uploadService = {
  async uploadImage(userId, file) {
    if (!file?.buffer?.length) {
      throw new BadRequestError("請上傳圖片");
    }

    const detectedType = await fileTypeFromBuffer(file.buffer);
    const extension = detectedType
      ? ALLOWED_IMAGE_TYPES[detectedType.mime]
      : undefined;

    if (!extension) {
      throw new BadRequestError("僅支援 JPG、PNG 圖片");
    }

    const objectKey = `images/${userId}/${randomUUID()}.${extension}`;
    const r2Config = config.cloudflareR2;

    await getR2Client().send(
      new PutObjectCommand({
        Bucket: r2Config.bucketName,
        Key: objectKey,
        Body: file.buffer,
        ContentType: detectedType.mime,
        CacheControl: "public, max-age=31536000, immutable",
      }),
    );

    return `${r2Config.publicUrl}/${objectKey}`;
  },
};

export default uploadService;
