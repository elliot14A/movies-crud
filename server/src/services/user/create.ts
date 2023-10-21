import { Prisma, User } from "@prisma/client";
import prisma from "../../utils/database";
import { Result } from "@badrap/result";
import { ApiError, ApiErrorType } from "../../error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function create({
  email,
  name,
  password,
}: Prisma.UserCreateInput): Promise<Result<User>> {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        password,
        email,
      },
    });

    return Result.ok(user);
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
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
