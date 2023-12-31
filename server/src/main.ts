import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import logger from "./utils/logger";
import { routes } from "./routes";

async function main() {
  dotenv.config();
  const app = express();
  app.use(express.json());
  app.use(
    cors({
      origin: "*",
    }),
  );

  app.use(
    morgan(
      ":remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms",
    ),
  );
  app.use("/api", routes());
  const PORT = process.env.PORT || 8080;
  const server = http.createServer(app);
  server.listen(PORT, () => logger.info(`Listening on port ${PORT}`));
}

main().catch((e) => console.log("error ==>", e));
