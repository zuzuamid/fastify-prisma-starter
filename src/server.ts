import Fastify from "fastify";

import app from "./app";
import config from "./config";

async function main() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(app);

  try {
    await fastify.listen({
      port: Number(config.port) || 5000,
      host: "0.0.0.0",
    });
    console.log("Server is running on port", config.port);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  const exitHandler = () => {
    fastify.close(() => {
      console.info("Server closed!");
      process.exit(1);
    });
  };

  process.on("uncaughtException", (error) => {
    console.log(error);
    exitHandler();
  });

  process.on("unhandledRejection", (error) => {
    console.log(error);
    exitHandler();
  });
}

main();

// Improvement commit 30

// Improvement commit 57

// Improvement commit 66
