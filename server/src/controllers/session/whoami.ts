import { Request, Response } from "express";
import cookie from "cookie";
import { Claims, TokenType, signJwt, verifyJwt } from "../../utils/jwt";
import { validSession } from ".";

export async function whoami(req: Request, res: Response) {
  const cookies = req.headers.cookie;
  let cookiesJSON = cookie.parse(cookies || "");
  // check for movies_crud_session cookie
  // if not present, return 401
  const accessToken = cookiesJSON["accessToken"];
  const refreshToken = cookiesJSON["refreshToken"];
  let response: Record<string, any> = {};
  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { decoded, expired } = verifyJwt(accessToken, TokenType.AccessToken);
  // if expired, check for refresh token
  // if refresh token is present, create new access token
  if (expired) {
    if (!refreshToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { decoded: newDecoded, expired: newExpired } = verifyJwt(
      refreshToken,
      TokenType.RefreshToken,
    );
    if (newExpired || !newDecoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // check if session is still valid
    const valid = await validSession(newDecoded);
    if (!valid) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // create new access token and it in cookies
    const payload: Claims = newDecoded;
    const newAccessToken = signJwt(payload, TokenType.AccessToken);
    response["new_access_token"] = newAccessToken;
    response["subject"] = payload.userId;
    return res.status(200).json(response);
  }

  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  // if not expired, check if session is still valid
  const valid = await validSession(decoded);
  console.log(valid, decoded);

  if (!valid) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  response["subject"] = decoded.userId;
  return res.status(200).json(response);
}
