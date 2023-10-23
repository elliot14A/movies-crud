import { Request, Response } from "express";
import { DeleteMovieSchema } from "../../schemas/movie";
import deleteService from "../../services/movie/delete";
import { ApiError, ApiErrorType } from "../../error";

export default async function Delete(
  req: Request<DeleteMovieSchema["params"]>,
  res: Response<any, { user: string }>,
) {
  const id = req.params.movieId;
  const UserId = res.locals.user;
  const movieResult = await deleteService({ id, UserId });
  if (movieResult.isOk) {
    return res.status(200).send({ message: "Movie deleted successfully" });
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
