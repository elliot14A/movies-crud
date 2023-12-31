import { serverUrl } from "@/lib/constants";
import { User } from "@/lib/types/user";
import { Result } from "@badrap/result";
import axios, { AxiosError } from "axios";

export default async function details(): Promise<
  Result<User & { newAccessToken?: string }>
> {
  try {
    const res = await axios.get(serverUrl + "/api/user", {
      withCredentials: true,
    });
    let result = res.data;
    return Result.ok(result);
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
