import { serverUrl } from "@/lib/constants";
import { User } from "@/lib/types/user";
import { Result } from "@badrap/result";
import axios, { AxiosError } from "axios";

export default async function get(): Promise<Result<User>> {
  try {
    const res = await axios.get(serverUrl + "/api/user", {
      withCredentials: true,
    });
    return res.data;
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
