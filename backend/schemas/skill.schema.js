import z from "zod";

const skillBodySchema = z.object({
  name: z.string().trim().min(1),
});

export const deleteSkillSchema = z.object({
  params: z.object({
    skillId: z.uuid("ID錯誤"),
  }),
});

export const createSkillSchema = z.object({
  body: skillBodySchema,
});
