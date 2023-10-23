import { Result } from "@badrap/result";
import { Movie as PrismaMovie } from "@prisma/client";

export type Movie = Result<PrismaMovie>;
