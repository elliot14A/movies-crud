import { Result } from "@badrap/result";
import { Movie, Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ApiError, ApiErrorType } from "../../error";
import prisma from "../../utils/database";

export default async function list(
  args: Prisma.MovieFindManyArgs,
): Promise<Result<Omit<Movie, "UserId">[]>> {
  try {
    const movies = await prisma.movie.findMany({ ...args });
    const moviesWithoutUserId: Omit<Movie, "UserId">[] = movies.map((movie) => {
      return {
        title: movie.title,
        genre: movie.genre,
        description: movie.description,
        cast: movie.cast,
        release: movie.release,
        imageUrl: movie.imageUrl,
        id: movie.id,
        updatedAt: movie.updatedAt,
        createdAt: movie.createdAt,
      };
    });
    return Result.ok(moviesWithoutUserId);
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
