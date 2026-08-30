import z from "zod";
import { REQUEST_NULL_MSG } from "../utils/helper.js";

export const courseIdSchema = z.object({
  params: z.object({
    courseId: z.uuid(REQUEST_NULL_MSG),
  }),
});
