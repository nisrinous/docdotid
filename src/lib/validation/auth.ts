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

export const verifyEmailSchema = z
  .object({
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters long",
      })
      .max(100)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
        message:
          "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
      }),
    confirmpassword: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters long",
      })
      .max(100)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
        message:
          "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
      }),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"],
  });
