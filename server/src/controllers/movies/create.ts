import { ApiError, ApiErrorType } from "../../error";
import { CreateMovieSchema } from "../../schemas/movie";
import createService from "../../services/movie/create";
import { Request, Response } from "express";

export default async function create(
  req: Request<{}, {}, CreateMovieSchema["body"]>,
  res: Response<{}, { user: string }>,
) {
  const UserId = res.locals.user;
  const movieResult = await createService({
    ...req.body,
    UserId,
    User: {
      connect: { id: UserId },
    },
  });

  if (movieResult.isOk) {
    const movie = movieResult.value;
    return res.status(201).send(movie);
  } else {
    const err = movieResult.error;
    if (err instanceof ApiError) {
      if (err.error === ApiErrorType.EntityAlreadyExist) {
        return res.status(409).send({ message: err.message });
      } else if (err.error === ApiErrorType.ValidationError) {
        return res.status(400).send({ message: "Invalid date" });
      }
    }
    return res.status(500).send({ message: err.message });
  }
}
