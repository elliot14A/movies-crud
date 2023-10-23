import { Result } from "@badrap/result";
import { User } from "@prisma/client";
import prisma from "../../utils/database";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ApiError, ApiErrorType } from "../../error";

export async function list(): Promise<Result<User[]>> {
  try {
    const users = await prisma.user.findMany();
    return Result.ok(users);
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
