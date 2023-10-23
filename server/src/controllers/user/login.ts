import { LoginUserSchema } from "../../schemas/user";
import { Request, Response } from "express";
import { details } from "../../services/user/details";
import argon2 from "argon2";
import { ApiError, ApiErrorType } from "../../error";
import { create } from "../../services/session/create";
import { TokenType, signJwt } from "../../utils/jwt";

export async function login(
  req: Request<{}, {}, LoginUserSchema["body"]>,
  res: Response,
) {
  const { email, password } = req.body;
  const userResult = await details({ email });
  if (userResult.isOk) {
    const user = userResult.value;
    if (await argon2.verify(user.password, password).catch((_) => false)) {
      const sessionResult = await create({
        valid: true,
        User: { connect: { id: user.id } },
      });
      if (sessionResult.isErr) {
        return res.status(500).send({ message: sessionResult.error.message });
      }

      const accessTokenTtl = process.env.ACCESSTOKENTTL || "15m";
      const refreshTokenTtl = process.env.REFRESHTOKENTTL || "1y";

      const accessToken = signJwt(
        {
          email: user.email,
          userId: user.id,
          sessionId: sessionResult.value.id,
        },
        TokenType.AccessToken,
        {
          expiresIn: accessTokenTtl,
        },
      );

      const refreshToken = signJwt(
        {
          email: user.email,
          sessionId: sessionResult.value.id,
          userId: user.id,
        },
        TokenType.RefreshToken,
        { expiresIn: refreshTokenTtl },
      );

      return res
        .status(200)
        .send({ message: "Login Successful", refreshToken, accessToken });
    }
    return res.status(401).send({ message: "Invalid email or password" });
  } else {
    const e = userResult.error;
    if (e instanceof ApiError) {
      if (e.error === ApiErrorType.NotFound) {
        return res.status(401).send({ message: "Invalid email or password" });
      }
    }
    return res.status(500).send({ message: e.message });
  }
}
