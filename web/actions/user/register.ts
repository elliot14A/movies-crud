import { CreateUserSchema } from "@/lib/zod/schemas/user";
import axios, { AxiosError } from "axios";
import serverUrl from "@/lib/utils/getServerUrl";
import { Result } from "@badrap/result";
import { ApiError, ApiErrorType } from "../error";
import { User } from "@/types/user";

export async function register(data: CreateUserSchema): Promise<Result<User>> {
  const { email, name, password } = data;
  try {
    const res = await axios.post(serverUrl + "/api/auth/register", {
      email,
      name,
      password,
    });
    return Result.ok(res.data);
  } catch (e) {
    if (e instanceof AxiosError) {
      const response = e.response;
      if (!response) {
        return Result.err(
          new ApiError(
            ApiErrorType.InternalServerError,
            "Something went wrong",
          ),
        );
      }
      if (response.status === 400) {
        return Result.err(
          new ApiError(ApiErrorType.BadRequest, response.data.message),
        );
      } else if (response.status === 409) {
        return Result.err(
          new ApiError(ApiErrorType.Conflict, response.data.message),
        );
      }
      return Result.err(
        new ApiError(ApiErrorType.InternalServerError, response.data.message),
      );
    }
    return Result.err(
      new ApiError(ApiErrorType.InternalServerError, "Something went wrong"),
    );
  }
}
