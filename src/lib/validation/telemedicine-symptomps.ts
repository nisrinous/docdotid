import * as z from "zod";

export const TelemedicineSymptoms = z.object({
  symptoms: z
    .string()
    .min(50, { message: "Please tell us in at least 30 characters" }),
});
