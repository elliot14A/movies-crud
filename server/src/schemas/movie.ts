import { z } from "zod";

export const createMovieSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(255),
    description: z.string().min(3).max(255),
    release: z.string(),
    imageUrl: z.string().url(),
    cast: z.array(z.string().min(3).max(255)).default([]),
    genre: z.string().min(3).max(255),
  }),
});

export const getMovieByIdSchema = z.object({
  params: z.object({
    movieId: z.string({ required_error: "movieId is required" }),
  }),
});

export const updateMovieSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(255).optional(),
    description: z.string().min(3).max(255).optional(),
    release: z.string().optional(),
    imageUrl: z.string().url().optional(),
    cast: z.array(z.string().min(3).max(255)).optional(),
    genre: z.string().min(3).max(255).optional(),
  }),
  params: z.object({
    movieId: z.string({ required_error: "movieId is required" }),
  }),
});

export const getAllMoviesSchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
  }),
});

export const deleteMovieSchema = z.object({
  params: z.object({
    movieId: z.string({ required_error: "movieId is required" }),
  }),
});

export type CreateMovieSchema = z.infer<typeof createMovieSchema>;
export type UpdateMovieSchema = z.infer<typeof updateMovieSchema>;
export type GetAllMoviesSchema = z.infer<typeof getAllMoviesSchema>;
export type GetMovieByIdSchema = z.infer<typeof getMovieByIdSchema>;
export type DeleteMovieSchema = z.infer<typeof deleteMovieSchema>;
