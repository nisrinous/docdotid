import * as z from "zod";

export const editProfileUserSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Full name must be at least 5 characters" })
    .refine((val) => !/\d/.test(val), {
      message: "Full name should not contain numbers",
    }),
  phone: z.string().nullable(),
  gender: z.string().nullable(),
  height: z
    .string()
    .regex(/^\d+(\.\d+)?$/)
    .nullable(),
  weight: z
    .string()
    .regex(/^\d+(\.\d+)?$/)
    .nullable(),
  image: z.string(),
});
