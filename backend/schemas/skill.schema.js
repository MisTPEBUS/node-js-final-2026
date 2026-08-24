import z from "zod";

const skillBodySchema = z.object({
  name: z
    .string({
      error: "欄位未填寫正確",
    })
    .trim()
    .min(1, "欄位未填寫正確"),
});

export const deleteSkillSchema = z.object({
  params: z.object({
    skillId: z.string().uuid("欄位未填寫正確"),
  }),
});

export const createSkillSchema = z.object({
  body: skillBodySchema,
});
