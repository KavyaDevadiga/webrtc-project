import { PORT } from "@src/config/env";
import connectDB from "@src/database";
import { initializeHttpServer } from "@src/http";
import express from "express";

if (!PORT) {
  console.log(`No port value specified...`);
  process.exit(1);
}

const app = express();

connectDB()
  .then(() => {
    initializeHttpServer(app);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    process.exit(1);
  });
