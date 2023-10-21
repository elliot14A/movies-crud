import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const primsa = new PrismaClient();

// run this hook before create a new user
primsa.$use(async (params, next) => {
  if (params.model === "User" && params.action === "create") {
    params.args.data.password = await argon2.hash(
      params.args.data.password,
      {},
    );
  }
  next(params);
});

export default primsa;
