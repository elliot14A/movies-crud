import { Prisma } from "@prisma/client";
import { Movie } from ".";
import prisma from "../../utils/database";
import { Result } from "@badrap/result";
import { ApiError, ApiErrorType } from "../../error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function create({
  title,
  genre,
  cast,
  UserId,
  User,
  imageUrl,
  release,
}: Prisma.MovieCreateInput & { UserId: string }): Promise<Movie> {
  try {
    const exists = await prisma.movie.count({
      where: { title, UserId },
    });
    if (exists) {
      return Result.err(
        new ApiError(
          ApiErrorType.EntityAlreadyExist,
          `movie with same title: ${title} already exist`,
        ),
      );
    }
    const movie = await prisma.movie.create({
      data: {
        title,
        genre,
        cast,
        User,
        imageUrl,
        release,
      },
    });
    return Result.ok(movie);
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return Result.err(
          new ApiError(ApiErrorType.EntityAlreadyExist, e.message),
        );
      }
    } else if (e instanceof Error) {
      return Result.err(
        new ApiError(ApiErrorType.EntityAlreadyExist, e.message),
      );
    }
    return Result.err(
      new ApiError(ApiErrorType.InternalServerError, "Unknown Error Occured"),
    );
  }
}
