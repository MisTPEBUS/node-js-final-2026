import z from "zod";
import { REQUEST_NULL_MSG, REQUEST_TYPE_ERROR_MSG } from "../utils/helper.js";

export const createCoachSchema = z.object({
  params: z.object({
    userId: z.uuid(REQUEST_NULL_MSG),
  }),
  body: z.object({
    experience_years: z
      .number(REQUEST_TYPE_ERROR_MSG)
      .int(REQUEST_NULL_MSG)
      .min(0, REQUEST_NULL_MSG),

    description: z
      .string(REQUEST_TYPE_ERROR_MSG)
      .trim()
      .min(1, REQUEST_NULL_MSG),

    profile_image_url: z
      .string(REQUEST_TYPE_ERROR_MSG)
      .optional()
      .refine(
        (value) =>
          value === undefined ||
          value.trim() === "" ||
          value.startsWith("https"),
        {
          message: REQUEST_NULL_MSG,
        },
      ),
  }),
});

const updateCoachBodySchema = z.object({
  experience_years: z
    .number(REQUEST_TYPE_ERROR_MSG)
    .int(REQUEST_NULL_MSG)
    .min(0, REQUEST_NULL_MSG),

  description: z.string(REQUEST_TYPE_ERROR_MSG).trim().min(1, REQUEST_NULL_MSG),

  profile_image_url: z
    .string(REQUEST_TYPE_ERROR_MSG)
    .trim()
    .min(1, REQUEST_NULL_MSG)
    .refine((value) => value.startsWith("https"), REQUEST_NULL_MSG),

  skill_ids: z
    .array(z.uuid(REQUEST_NULL_MSG), REQUEST_TYPE_ERROR_MSG)
    .min(1, REQUEST_NULL_MSG),
});

export const updateCoachSchema = z.object({
  body: updateCoachBodySchema,
});
