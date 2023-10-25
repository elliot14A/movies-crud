import axios, { AxiosError } from "axios";
import { Result } from "@badrap/result";
import { UpdateMovieSchema } from "@/lib/types/movie";
import { serverUrl } from "@/lib/constants";

export default async function update(id: string, data: UpdateMovieSchema) {
  try {
    const payload = {
      ...data,
      cast: data.cast?.split(","),
    };
    const res = await axios.patch(serverUrl + `/api/movies/${id}`, payload, {
      withCredentials: true,
    });
    console.log(res.data);
    return Result.ok(res.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      const response = error.response;
      if (!response) {
        return Result.err(new Error("No response from server"));
      }
      if (response.status >= 400) {
        const message =
          response.data.message === ""
            ? `${response.status}`
            : response.data.message;
        return Result.err(new Error(message));
      }
    }
    return Result.err(new Error("Something went wrong"));
  }
}
