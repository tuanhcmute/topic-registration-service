import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { keys } from "./keys";
dotenv.config();

const keysDatabase = process.env.NODE_ENV === "production" ? keys.db.production : keys.db.development;
const { dbName, dbUser, dbPassword, dbHost } = keysDatabase;

const db = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: "mysql",
  logging: false
});

export default db;
