import express from "express";
import { register } from "./controllers/user/register";
import { validate } from "./middleware/validate";
import { createUserSchema, loginUserSchema } from "./schemas/user";
import { login } from "./controllers/user/login";
import { whoami } from "./controllers/session/whoami";

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

export function routes(): express.Router {
  const router = express.Router();
  router.use("/auth", authRouter());
  router.get("/health", (req, res) => {
    console.log(req.headers);
    return res.sendStatus(200);
  });
  router.use("/sessions", sessionRoutes());

  return router;
}
