"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbName = process.env.DB_NAME || "test";
const dbUser = process.env.DB_USER || "postgres";
const dbPasswd = process.env.DB_PASSWORD || "";
const dbHost = process.env.DB_HOST || "localhost";
const db = new sequelize_1.Sequelize(dbName, dbUser, dbPasswd, {
    host: dbHost,
    dialect: "postgres",
});
exports.default = db;
