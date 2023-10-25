import { serverUrl } from "@/lib/constants";
import { CreateMovieSchema } from "@/lib/types/movie";
import { Result } from "@badrap/result";
import axios, { AxiosError } from "axios";

export default async function create(data: CreateMovieSchema) {
  try {
    const payload = {
      ...data,
      imageUrl: "https://picsum.photos/200/300",
      cast: data.cast.split(","),
    };
    const res = await axios.post(serverUrl + "/api/movies/", payload, {
      withCredentials: true,
    });
    return Result.ok(res);
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
