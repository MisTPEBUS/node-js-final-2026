const app = require("./app");
const config = require("./config");
const dataSource = require("./db/data-source");

const port = Number(config.web.port);

async function startServer() {
  await dataSource.initialize();

  const server = app.listen(port, () => {
    console.log(`Backend is listening on port ${port}`);
  });

  let isShuttingDown = false;

  async function shutdown(signal) {
    if (isShuttingDown) return;
    isShuttingDown = true;

    console.log(`${signal} received, shutting down`);

    try {
      await new Promise((resolve, reject) => {
        server.close((error) => {
          if (error) return reject(error);
          resolve();
        });
      });

      if (dataSource.isInitialized) {
        await dataSource.destroy();
      }

      process.exit(0);
    } catch (error) {
      console.error("Failed to shut down backend", error);
      process.exit(1);
    }
  }

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

startServer().catch((error) => {
  console.error("Failed to start backend", error);
  process.exit(1);
});
