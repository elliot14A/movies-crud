import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(6, "password should contain atleast 6 chars")
      .max(100),
    name: z
      .string()
      .min(3, "name should contain atleast 3 chars")
      .max(100)
      .optional(),
  }),
});

export const updateUserSchema = z
  .object({
    body: z.object({
      email: z.string().email().optional(),
      name: z
        .string()
        .min(3, "name should contain atleast 3 chars")
        .max(100)
        .optional(),
    }),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });

export const loginUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6, "password should contain atleast 6 chars"),
  }),
});

export type LoginUserSchema = z.infer<typeof loginUserSchema>;
export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
