import { serverUrl } from "@/lib/constants";
import { Result } from "@badrap/result";
import axios, { AxiosError } from "axios";

export default async function login() {
  try {
    const res = await axios.post(
      serverUrl + "/api/auth/logout",
      {},
      {
        withCredentials: true,
      },
    );
    return Result.ok(res.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      const response = error.response;
      if (!response) {
        return Result.err(new Error("No response from server"));
      }
      if (response.status >= 400) {
        const message =
          response.data.message !== ""
            ? response.data.message
            : "Something went wrong";
        return Result.err(new Error(message));
      }
    }
    return Result.err(new Error("Something went wrong"));
  }
}
