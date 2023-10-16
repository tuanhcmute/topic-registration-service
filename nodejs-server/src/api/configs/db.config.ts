import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { keys } from "./keys";
dotenv.config();

const { dbName, dbUser, dbPassword, dbHost } = keys.db.development;

const db = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: "mysql",
  logging: false,
});

export default db;
