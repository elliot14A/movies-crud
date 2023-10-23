import { Prisma } from "@prisma/client";
import { Movie } from ".";
import prisma from "../../utils/database";
import { Result } from "@badrap/result";
import { ApiError, ApiErrorType } from "../../error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function update(data: Prisma.MovieUpdateInput): Promise<Movie> {
  try {
    const exists = await prisma.movie.count({
      where: { id: data.id?.toString() },
    });
    if (exists === 0) {
      return Result.err(new ApiError(ApiErrorType.NotFound, "Movie not found"));
    }
    const movieUpdated = await prisma.movie.update({
      where: { id: data.id?.toString() },
      data,
    });
    return Result.ok(movieUpdated);
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      console.log(e.code);
      return Result.err(
        new ApiError(ApiErrorType.InternalServerError, e.message),
      );
    }
    return Result.err(
      new ApiError(ApiErrorType.InternalServerError, "Unknown Error Occured"),
    );
  }
}
