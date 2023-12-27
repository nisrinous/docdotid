import * as z from "zod";

export const authRegisterSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  name: z
    .string()
    .min(5, { message: "Full name must be at least 5 characters" })
    .max(30, { message: "Maximum full name is 30 characters" })
    .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/, {
      message: "Full name must not contains special character",
    }),
});
