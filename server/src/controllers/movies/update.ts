import { Request, Response } from "express";
import updateService from "../../services/movie/update";
import { UpdateMovieSchema } from "../../schemas/movie";
import { ApiError, ApiErrorType } from "../../error";

export default async function update(
  req: Request<UpdateMovieSchema["params"], any, UpdateMovieSchema["body"]>,
  res: Response<any, { user: String }>,
) {
  const movieId = req.params.movieId;
  const data = req.body;

  const movieResult = await updateService({ ...data, id: movieId });
  if (movieResult.isOk) {
    const movie = movieResult.value;
    return res.status(200).send(movie);
  } else {
    const err = movieResult.error;
    if (err instanceof ApiError) {
      if (err.error === ApiErrorType.NotFound) {
        return res.status(404).send({ message: "Movie not found" });
      }
    }
    return res.status(500).send({ message: err.message });
  }
}
