import { z } from "zod";

export const createMovieSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
  release: z.string(),
  cast: z.string().min(3).max(255),
  genre: z.string().min(3).max(255),
});

export const updateMovieSchema = z.object({
  title: z.string().min(3).max(255).optional(),
  description: z.string().min(3).max(255).optional(),
  release: z.string().optional(),
  cast: z.string().min(3).max(255).optional(),
  genre: z.string().min(3).max(255).optional(),
});

export type CreateMovieSchema = z.infer<typeof createMovieSchema>;
export type UpdateMovieSchema = z.infer<typeof updateMovieSchema>;
