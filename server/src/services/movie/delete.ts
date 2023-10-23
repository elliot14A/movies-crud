import { Prisma } from "@prisma/client";
import prisma from "../../utils/database";
import { Result } from "@badrap/result";
import { ApiError, ApiErrorType } from "../../error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function Delete(where: Prisma.MovieWhereInput) {
  try {
    const exists = await prisma.movie.count({ where });
    if (exists === 0) {
      return Result.err(new ApiError(ApiErrorType.NotFound, "Movie not found"));
    }
    await prisma.movie.delete({
      where: { id: where.id!.toString() },
    });
    return Result.ok("Movie Deleted");
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
