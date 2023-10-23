import express from "express";
import { register } from "./controllers/user/register";
import { validate } from "./middleware/validate";
import { createUserSchema, loginUserSchema } from "./schemas/user";
import { login } from "./controllers/user/login";
import { whoami } from "./controllers/session/whoami";
import listMoviesHandler from "./controllers/movies/list";
import createMovieHandler from "./controllers/movies/create";
import { authGuard } from "./middleware/authGuard";
import updateMovieHandler from "./controllers/movies/update";
import getMovieHandler from "./controllers/movies/details";
import deleteMovieHandler from "./controllers/movies/delete";
import {
  createMovieSchema,
  deleteMovieSchema,
  getAllMoviesSchema,
  getMovieByIdSchema,
  updateMovieSchema,
} from "./schemas/movie";

function authRouter(): express.Router {
  const router = express.Router();
  router.post("/register", validate(createUserSchema), register);
  router.post("/login", validate(loginUserSchema), login);

  return router;
}

function sessionRoutes(): express.Router {
  const router = express.Router();
  router.get("/whoami", whoami);
  return router;
}

function movieRoutes(): express.Router {
  const router = express.Router();
  router.use(authGuard());
  router
    .get("/", validate(getAllMoviesSchema), listMoviesHandler)
    .post("/", validate(createMovieSchema), createMovieHandler)
    .patch("/:movieId", validate(updateMovieSchema), updateMovieHandler)
    .get("/:movieId", validate(getMovieByIdSchema), getMovieHandler)
    .delete("/:movieId", validate(deleteMovieSchema), deleteMovieHandler);
  return router;
}

export function routes(): express.Router {
  const router = express.Router();
  router.use("/auth", authRouter());
  router.get("/health", (req, res) => {
    console.log(req.headers);
    return res.sendStatus(200);
  });
  router.use("/sessions", sessionRoutes());
  router.use("/movies", movieRoutes());

  return router;
}
