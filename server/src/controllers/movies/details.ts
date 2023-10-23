import { Request, Response } from "express";
import { GetMovieByIdSchema } from "../../schemas/movie";
import detailsService from "../../services/movie/details";
import { ApiError, ApiErrorType } from "../../error";
export default async function details(
  req: Request<GetMovieByIdSchema["params"]>,
  res: Response<any, { user: string }>,
) {
  const id = req.params.movieId;
  const UserId = res.locals.user;
  const movieResult = await detailsService({ id, UserId });
  if (movieResult.isOk) {
    const movie = movieResult.value;
    return res.status(200).send(movie);
  } else {
    const err = movieResult.error;
    if (err instanceof ApiError) {
      if (err.error === ApiErrorType.NotFound) {
        return res.status(404).send({ message: err.message });
      }
    }
    return res.status(500).send({ message: err.message });
  }
}
