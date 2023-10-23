import { Request, Response } from "express";
import { update } from "../../services/session/update";
import cookie from "cookie";
import { TokenType, verifyJwt } from "../../utils/jwt";

export default async function logout(
  req: Request,
  res: Response<any, { user: string }>,
) {
  const UserId = res.locals.user;
  const cookies = req.headers.cookie;
  if (!cookies) return res.status(401);
  const cookieJson = cookie.parse(cookies);
  const accessToken = cookieJson["movies-crud-session-cookie"];
  const refreshToken = cookieJson["movies-crud-refresh-cookie"];

  const { decoded: AccessDecoded } = verifyJwt(
    accessToken,
    TokenType.AccessToken,
  );
  const { decoded: RefreshDecoded } = verifyJwt(
    refreshToken,
    TokenType.RefreshToken,
  );
  if (!AccessDecoded || !RefreshDecoded) return res.sendStatus(401);
  // invalidate refresh token
  // invalidate access token
  Promise.all([
    await update({
      id: RefreshDecoded.sessionId,
      UserId,
      valid: false,
    }),
    await update({
      id: AccessDecoded.sessionId,
      UserId,
      valid: false,
    }),
  ]);

  return res.status(200).send({ message: "logout successful" });
}
