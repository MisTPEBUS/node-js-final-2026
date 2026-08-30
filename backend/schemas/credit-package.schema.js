import z from "zod";

const creditPackageBodySchema = z.object({
  name: z.string().trim().min(1),
  credit_amount: z.number().int().nonnegative(),
  price: z.number().int().nonnegative(),
});

export const createCreditPackageSchema = z.object({
  body: creditPackageBodySchema,
});

export const deleteCreditPackageSchema = z.object({
  params: z.object({ creditPackageId: z.uuid("ID錯誤") }),
});

export const purchaseCreditPackageSchema = z.object({
  params: z.object({ creditPackageId: z.uuid("ID錯誤") }),
});
