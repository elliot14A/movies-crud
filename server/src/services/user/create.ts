import { Prisma } from "@prisma/client";
import prisma from "../../utils/database";
import { Result } from "@badrap/result";
import { ApiError, ApiErrorType } from "../../error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { User } from ".";
import { omit } from "lodash";

export async function create({
  email,
  name,
  password,
}: Prisma.UserCreateInput): Promise<User> {
  try {
    const exists = await prisma.user.count({ where: { email } });
    console.log("exists ===>", exists);
    if (exists > 0) {
      return Result.err(
        new ApiError(
          ApiErrorType.EntityAlreadyExist,
          `User with the same email:${email} already exists`,
        ),
      );
    }
    const user = await prisma.user.create({
      data: {
        name,
        password,
        email,
      },
    });
    console.log("server ===>", user);
    return Result.ok(omit(user, "password"));
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
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
