import z from "zod";
import {
  months,
  REQUEST_NULL_MSG,
  REQUEST_TYPE_ERROR_MSG,
} from "../utils/helper.js";

const intParamSchema = z
  .string(REQUEST_TYPE_ERROR_MSG)
  .regex(/^\d+$/, REQUEST_NULL_MSG)
  .transform(Number)
  .refine(Number.isSafeInteger, {
    message: REQUEST_NULL_MSG,
  });

export const getCoachesSchema = z.object({
  query: z.object({
    per: intParamSchema,
    page: intParamSchema,
  }),
});

export const coachIdSchema = z.object({
  params: z.object({
    coachId: z.uuid(REQUEST_NULL_MSG),
  }),
});

//M6
export const revenueSchema = z.object({
  query: z.object({
    month: z.enum(months, {
      error: REQUEST_NULL_MSG,
    }),
  }),
});
