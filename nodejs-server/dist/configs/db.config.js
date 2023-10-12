"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const keys_1 = require("./keys");
dotenv_1.default.config();
const { dbName, dbUser, dbPassword, dbHost } = keys_1.keys.db.development;
const db = new sequelize_1.Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: "mysql",
    logging: false,
});
exports.default = db;
