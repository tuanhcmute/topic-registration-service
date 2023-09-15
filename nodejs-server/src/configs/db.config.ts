import { Dialect, Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbName: string = process.env.DB_NAME || "test";
const dbUser: string = process.env.DB_USER || "postgres";
const dbPasswd: string = process.env.DB_PASSWORD || "";
const dbHost: string = process.env.DB_HOST || "localhost";

const db = new Sequelize(dbName, dbUser, dbPasswd, {
  host: dbHost,
  dialect: "postgres",
  timezone: "UTC",
});

export default db;
