"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../configs/db.config"));
const account_model_1 = require("./account.model");
const User = db_config_1.default.define("user", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        field: "first_name",
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        field: "last_name",
    },
    gender: {
        type: sequelize_1.DataTypes.STRING,
        field: "gender",
    },
    dob: {
        type: sequelize_1.DataTypes.DATE,
        field: "date_of_birth",
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        field: "email",
    },
}, {
    timestamps: false,
    tableName: "users",
});
exports.User = User;
User.hasOne(account_model_1.Account, { foreignKey: "userId" });
account_model_1.Account.hasOne(User, { foreignKey: "id" });
