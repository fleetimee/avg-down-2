import { z } from "zod";

const MAX_NUMERIC_VALUE = 99999999999.99999999;

export const UpdateTransactionSchema = z.object({
  quantity: z
    .string()
    .min(1, "Quantity is required")
    .refine((val) => !isNaN(parseFloat(val)), "Must be a valid number")
    .refine((val) => parseFloat(val) > 0, "Must be greater than 0")
    .refine(
      (val) => parseFloat(val) <= MAX_NUMERIC_VALUE,
      `Must be less than or equal to ${MAX_NUMERIC_VALUE}`
    ),
  price_per_coin: z
    .string()
    .min(1, "Price per coin is required")
    .refine((val) => !isNaN(parseFloat(val)), "Must be a valid number")
    .refine((val) => parseFloat(val) > 0, "Must be greater than 0")
    .refine(
      (val) => parseFloat(val) <= MAX_NUMERIC_VALUE,
      `Must be less than or equal to ${MAX_NUMERIC_VALUE}`
    ),
});
