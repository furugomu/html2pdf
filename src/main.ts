import fastify from "fastify";
import fastifyStatic from "fastify-static";
import path from "path";
import { api } from "./api";
import cors from "fastify-cors";

export async function main(): Promise<void> {
  const port = Number(process.env.PORT || 8080);
  const server = fastify();

  server.register(cors);
  server.register(api);
  server.register(fastifyStatic, { root: path.join(__dirname, "../public") });

  try {
    await server.listen(port, "0.0.0.0");
    console.log("こんにちは", port);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
