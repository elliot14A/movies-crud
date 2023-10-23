import { details } from "../../services/session/details";
import { Claims } from "../../utils/jwt";

export async function validSession(payload: Claims): Promise<boolean> {
  const { sessionId, userId }: Claims = payload;
  const sessionResult = await details({ id: sessionId, UserId: userId });
  console.log(sessionResult);
  if (sessionResult.isErr) {
    return false;
  }

  const { valid } = sessionResult.value;
  if (!valid) {
    return false;
  }

  return true;
}
