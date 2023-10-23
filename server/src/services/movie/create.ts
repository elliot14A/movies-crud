import { Prisma } from "@prisma/client";
import { Movie } from ".";
import prisma from "../../utils/database";
import { Result } from "@badrap/result";
import { ApiError, ApiErrorType } from "../../error";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

export default async function create({
  title,
  genre,
  cast,
  UserId,
  User,
  imageUrl,
  description,
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
        description,
        imageUrl,
        release,
      },
    });
    return Result.ok(movie);
  } catch (e: any) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return Result.err(
          new ApiError(ApiErrorType.EntityAlreadyExist, e.message),
        );
      }
      if (e.code === "P2025") {
        return Result.err(
          new ApiError(
            ApiErrorType.InternalServerError,
            "Something went wrong",
          ),
        );
      }
    } else if (e instanceof PrismaClientValidationError) {
      return Result.err(new ApiError(ApiErrorType.ValidationError, e.message));
    } else if (e instanceof Error) {
      return Result.err(
        new ApiError(ApiErrorType.InternalServerError, e.message),
      );
    }
    return Result.err(
      new ApiError(ApiErrorType.InternalServerError, "Unknown Error Occured"),
    );
  }
}
