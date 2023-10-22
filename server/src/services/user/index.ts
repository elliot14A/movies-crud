import { Result } from "@badrap/result";
import { User as PrismaUser } from "@prisma/client";
import { Omit } from "@prisma/client/runtime/library";

export type User = Result<Omit<PrismaUser, "password">>;
