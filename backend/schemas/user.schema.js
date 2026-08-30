import z from "zod";
import {
  PASSWORD_ERROR_MSG,
  PASSWORD_REGEX,
  REQUEST_NULL_MSG,
  REQUEST_TYPE_ERROR_MSG,
} from "../utils/helper.js";

const userBodySchema = z.object({
  name: z.string(REQUEST_TYPE_ERROR_MSG).trim().min(1, REQUEST_NULL_MSG),
  email: z.string(REQUEST_TYPE_ERROR_MSG).trim().min(1, REQUEST_NULL_MSG),
  password: z
    .string(REQUEST_TYPE_ERROR_MSG)
    .min(1, REQUEST_NULL_MSG)
    .regex(PASSWORD_REGEX, PASSWORD_ERROR_MSG),
});

export const signupSchema = z.object({
  body: userBodySchema,
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string(REQUEST_TYPE_ERROR_MSG).trim().min(1, REQUEST_NULL_MSG),
    password: z
      .string(REQUEST_TYPE_ERROR_MSG)
      .min(1, REQUEST_NULL_MSG)
      .regex(PASSWORD_REGEX, PASSWORD_ERROR_MSG),
  }),
});

export const updateProfileSchema = z.object({
  body: z.object({
    name: z.string(REQUEST_TYPE_ERROR_MSG).trim().min(1, REQUEST_NULL_MSG),
  }),
});

export const updatePasswordSchema = z.object({
  body: z.object({
    password: z
      .string(REQUEST_TYPE_ERROR_MSG)
      .min(1, REQUEST_NULL_MSG)
      .regex(PASSWORD_REGEX, PASSWORD_ERROR_MSG),

    new_password: z
      .string(REQUEST_TYPE_ERROR_MSG)
      .min(1, REQUEST_NULL_MSG)
      .regex(PASSWORD_REGEX, PASSWORD_ERROR_MSG),

    confirm_new_password: z
      .string(REQUEST_TYPE_ERROR_MSG)
      .min(1, REQUEST_NULL_MSG)
      .regex(PASSWORD_REGEX, PASSWORD_ERROR_MSG),
  }),
});
