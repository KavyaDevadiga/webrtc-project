import express from "express";
import { PORT } from "@src/config/env";
import { initializeHttpServer } from "@src/http";

if (!PORT) {
  console.log(`No port value specified...`);
}

const app = express();
initializeHttpServer(app);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
