import * as dotevnv from "dotenv";

dotevnv.config();

export const PORT = parseInt(process.env.PORT as string, 10);
