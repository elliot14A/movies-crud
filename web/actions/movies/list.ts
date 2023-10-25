import axios, { AxiosError } from "axios";
import { Result } from "@badrap/result";
import { serverUrl } from "@/lib/constants";

export default async function list() {
  try {
    const res = await axios.get(serverUrl + "/api/movies/", {
      withCredentials: true,
    });
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
