import { PORT } from "@src/config/env";
import { MongoConnection } from "@src/database";
import { initializeHttpServer } from "@src/http";
import express from "express";

if (!PORT) {
  console.log(`No port value specified...`);
  process.exit(1);
}

const app = express();
(async function () {
  try {
    const db = await MongoConnection.getInstance();
    initializeHttpServer(app);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    process.exit(1);
  }
})();
