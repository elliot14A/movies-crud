import { Result } from "@badrap/result";
import { Prisma, Session } from "@prisma/client";
import prisma from "../../utils/database";
import { ApiError, ApiErrorType } from "../../error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function update({
  id,
  valid,
  UserId,
}: Prisma.SessionUpdateInput & { UserId: string }): Promise<Result<Session>> {
  try {
    const exists = await prisma.session.count({
      where: { id: id?.toString(), UserId },
    });
    if (exists > 0) {
      return Result.err(
        new ApiError(ApiErrorType.NotFound, "Session not found"),
      );
    }
    const sessionUpdated = await prisma.session.update({
      where: { id: id?.toString() },
      data: {
        valid,
        UserId,
      },
    });
    return Result.ok(sessionUpdated);
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
