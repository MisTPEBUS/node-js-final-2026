const app = require("../app");
const config = require("../config");
const dataSource = require("../db/data-source");

const port = config.get("web.port");

async function startServer() {
  await dataSource.initialize();

  const server = app.listen(port, () => {
    console.log(`Backend is listening on port ${port}`);
  });

  async function shutdown(signal) {
    console.log(`${signal} received, shutting down`);

    server.close(async () => {
      if (dataSource.isInitialized) {
        await dataSource.destroy();
      }
      process.exit(0);
    });
  }

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

startServer().catch((error) => {
  console.error("Failed to start backend", error);
  process.exit(1);
});
