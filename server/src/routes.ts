import express from "express";
import { register } from "./controllers/user/register";
import { validate } from "./middleware/validate";
import { createUserSchema } from "./schemas/user";

function authRouter(): express.Router {
  const router = express.Router();
  router.post("/register", validate(createUserSchema), register);

  return router;
}

export function routes(): express.Router {
  const router = express.Router();
  router.use("/auth", authRouter());
  router.get("/health", (_, res) => {
    return res.sendStatus(200);
  });
  return router;
}
