import { Prisma } from "@prisma/client";
import { Movie } from ".";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ApiError, ApiErrorType } from "../../error";
import { Result } from "@badrap/result";
import prisma from "../../utils/database";

export async function details(where: Prisma.MovieWhereInput): Promise<Movie> {
  try {
    const movie = await prisma.movie.findFirst({ where });
    if (!movie) {
      return Result.err(
        new ApiError(ApiErrorType.NotFound, "Session not found"),
      );
    }
    return Result.ok(movie);
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return Result.err(
        new ApiError(ApiErrorType.InternalServerError, e.message),
      );
    }
    return Result.err(
      new ApiError(ApiErrorType.InternalServerError, "Unknown Error Occured"),
    );
  }
}
