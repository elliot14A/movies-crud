import { Result } from "@badrap/result";
import { Prisma } from "@prisma/client";
import prisma from "../..//utils/database";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ApiError, ApiErrorType } from "../../error";
import { User } from ".";

export async function update({
  id,
  email,
  name,
}: Prisma.UserUpdateInput): Promise<User> {
  try {
    const exists = await prisma.user.count({ where: { id: id?.toString() } });
    if (exists === 0) {
      return Result.err(new ApiError(ApiErrorType.NotFound, "User not found"));
    }
    const userUpdated = await prisma.user.update({
      where: { id: id?.toString() },
      data: {
        email,
        name,
      },
    });
    return Result.ok(userUpdated);
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
