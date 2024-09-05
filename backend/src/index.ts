import express from "express";
import { PORT } from "src/env";
import middleware from "src/setup/middleware";

if (!PORT) {
  console.log(`No port value specified...`);
}

const app = express();

middleware(app);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
