import app from "./app.js";
import config from "./config/index.js";
import dataSource from "./db/data-source.js";

const port = Number(config.web.port);

async function startServer() {
  let server;

  try {
    await dataSource.initialize();
    console.log("資料庫連線成功");
    server = app.listen(port, () => {
      console.log(`server 跑起來了：http://localhost:${port}`);
    });
  } catch (err) {
    console.error("資料庫連線失敗", err);
    process.exit(1);
  }

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
