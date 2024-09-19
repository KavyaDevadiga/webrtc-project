import * as dotevnv from "dotenv";

dotevnv.config();

export const PORT: number = parseInt(process.env.PORT as string, 10);

export const MONGO_URI: string = process.env.PORT as string;
