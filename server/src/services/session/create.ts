import { Result } from "@badrap/result";
import { Prisma, Session } from "@prisma/client";
import { ApiError, ApiErrorType } from "../../error";
import prisma from "../../utils/database";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function create({
  valid,
  User,
}: Prisma.SessionCreateInput): Promise<Result<Session>> {
  try {
    const session = await prisma.session.create({
      data: { valid, User },
    });
    console.log(session);
    return Result.ok(session);
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
