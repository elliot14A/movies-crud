import { Request, Response } from "express";
import { GetAllMoviesSchema } from "../../schemas/movie";
import listService from "../../services/movie/list";

export default async function list(
  req: Request<any, any, GetAllMoviesSchema["query"]>,
  res: Response<any, { user: string }>,
) {
  const { skip, take } = convertToPagination(req.query);
  const UserId = res.locals.user;
  console.log("UserId", UserId);
  const moviesResult = await listService({ skip, take, where: { UserId } });
  if (moviesResult.isOk) {
    const movies = moviesResult.value;
    return res.status(200).send(movies);
  } else {
    const err = moviesResult.error;
    return res.status(500).send({ message: err.message });
  }
}

function convertToPagination(query: GetAllMoviesSchema["query"]) {
  // default page = 1, limit = 20
  const { page = "1", limit: take = "20" } = query;
  const skip = page && take ? (parseInt(page) - 1) * parseInt(take) : 0;
  return { skip, take: parseInt(take) };
}
