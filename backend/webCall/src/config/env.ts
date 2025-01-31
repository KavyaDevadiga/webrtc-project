import * as dotenv from "dotenv";

dotenv.config();

export const PORT: number = parseInt(process.env.PORT as string, 10);
export const SERVER_URL: string = process.env.SERVER_URL as string;

//Mongo Credentials
export const MONGO_URI: string = process.env.MONGO_URI as string;

//Postgres Credentials
export const DB_HOST: string = process.env.DB_HOST as string;
export const DB_PORT: number = parseInt(process.env.DB_PORT as string, 10);
export const DB_USER: string = process.env.DB_USER as string;
export const DB_PASSWORD: string = process.env.DB_PASSWORD as string;
export const DB_NAME: string = process.env.DB_NAME as string;
export const POSTGRESS_URI: string = process.env.POSTGRESS_URI as string;

//Redis Credentials
export const REDIS_URI: string = process.env.REDIS_URI as string;
