import * as z from "zod";

export const editProfileDoctorSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Full name must be at least 5 characters" })
    .refine((val) => !/\d/.test(val), {
      message: "Full name should not contain numbers",
    }),
  years_of_exp: z
    .string()
    .regex(/^\d+(\.\d+)?$/)
    .nullable(),
  image: z.string(),
});
