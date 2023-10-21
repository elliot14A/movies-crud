import { Result } from "@badrap/result";
import { Session } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ApiError, ApiErrorType } from "../../error";
import prisma from "../../utils/database";

export async function list(): Promise<Result<Session[]>> {
  try {
    const sessions = await prisma.session.findMany();
    return Result.ok(sessions);
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      new ApiError(ApiErrorType.InternalServerError, e.message);
    }
    return Result.err(
      new ApiError(ApiErrorType.InternalServerError, "Unknown Error Occured"),
    );
  }
}
