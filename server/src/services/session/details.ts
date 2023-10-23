import { Result } from "@badrap/result";
import { Prisma, Session } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ApiError, ApiErrorType } from "../../error";
import prisma from "../../utils/database";

export async function details(
  where: Prisma.SessionWhereInput,
): Promise<Result<Session>> {
  try {
    const session = await prisma.session.findFirst({ where });
    if (!session) {
      return Result.err(
        new ApiError(ApiErrorType.NotFound, "Session not found"),
      );
    }
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
