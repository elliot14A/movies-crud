import { Request, Response } from "express";
import { details as detailsService } from "../../services/user/details";
import { ApiError, ApiErrorType } from "../../error";
import { omit } from "lodash";

export default async function details(
  _: Request,
  res: Response<any, { user: string }>,
) {
  const UserId = res.locals.user;

  const userResult = await detailsService({ id: UserId });
  if (userResult.isOk) {
    const user = omit(userResult.value, "password");
    return res.status(200).send(user);
  } else {
    const err = userResult.error;
    if (err instanceof ApiError) {
      if (err.error === ApiErrorType.NotFound) {
        return res.status(404).send({ message: err.message });
      }
    }
    return res.status(500).send({ message: err.message });
  }
}
