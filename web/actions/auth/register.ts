import { serverUrl } from "@/lib/constants";
import { RegisterCredentials } from "@/lib/validators";
import { Result } from "@badrap/result";
import axios, { AxiosError } from "axios";

export default async function register(
  data: RegisterCredentials,
): Promise<Result<any, Error>> {
  try {
    const res = await axios.post(serverUrl + "/api/auth/register", data, {});
    return Result.ok(res.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      const response = error.response;
      if (!response) {
        return Result.err(new Error("No response from server"));
      }
      if (response.status >= 400) {
        return Result.err(new Error(response.data.message));
      }
    }
    return Result.err(new Error("Something went wrong"));
  }
}
