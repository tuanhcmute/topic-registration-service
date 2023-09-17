"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../configs/db.config"));
const Account = db_config_1.default.define("account", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        field: "id",
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        field: "user_id",
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        field: "username",
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        field: "password",
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        field: "roles",
    },
}, {
    timestamps: false,
    tableName: "accounts",
});
exports.Account = Account;
