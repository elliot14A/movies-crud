import { Result } from "@badrap/result";
import { Prisma, User } from "@prisma/client";
import prisma from "../../utils/database";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ApiError, ApiErrorType } from "../../error";

export async function details(
  where: Prisma.UserWhereInput,
): Promise<Result<User>> {
  try {
    const user = await prisma.user.findFirst({ where });
    if (!user) {
      return Result.err(new ApiError(ApiErrorType.NotFound, "User not found"));
    }
    return Result.ok(user);
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
