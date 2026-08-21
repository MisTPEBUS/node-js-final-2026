import dataSource from "../db/data-source.js";

const healthCheck = async (req, res) => {
  try {
    await dataSource.query("SELECT 1");
    return res.status(200).type("text/plain").send("OK");
  } catch {
    res.status(503).send("Service Unavailable");
  }
};

export default healthCheck;
