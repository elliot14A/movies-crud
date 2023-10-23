import { NextFunction, Request, Response } from "express";

export const authGuard =
  () => (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers["x-user"]) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.locals.user = JSON.parse(req.headers["x-user"] as string);
    if (req.headers["x-access-token"] != "") {
      res.setHeader("x-access-token", req.headers["x-access-token"] as string);
    }
    return next();
  };
