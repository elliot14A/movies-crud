import { Result } from "@badrap/result";
import { Prisma, User } from "@prisma/client";
import prisma from "../../utils/database";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ApiError, ApiErrorType } from "../../error";

export async function details(
  select: Prisma.UserSelect,
): Promise<Result<User>> {
  try {
    const user = await prisma.user.findFirst({ select });
    if (!user) {
      return Result.err(new Error("User not found"));
    }
    return Result.ok(user);
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      new ApiError(ApiErrorType.InternalServerError, e.message);
    }
    return Result.err(
      new ApiError(ApiErrorType.InternalServerError, "Unknown Error Occured"),
    );
  }
}
