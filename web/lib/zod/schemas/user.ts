import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string({ required_error: "email is required" }).email(),
  name: z.string().min(3, "name should be at least 3 chars long").optional(),
  password: z
    .string({ required_error: "password is required" })
    .min(6, "password should be at least 6 chars long"),
});

export type CreateUserSchema = z.TypeOf<typeof createUserSchema>;
