"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Class = void 0;
const db_config_1 = __importDefault(require("../configs/db.config"));
const sequelize_1 = require("sequelize");
const user_model_1 = require("./user.model");
const Class = db_config_1.default.define("class", {
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        field: "id",
    },
    code: {
        type: sequelize_1.DataTypes.STRING,
        field: "code",
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        field: "description",
    },
    createdBy: {
        type: sequelize_1.DataTypes.STRING,
        field: "created_by",
    },
    createdDate: {
        type: sequelize_1.DataTypes.DATE,
        field: "created_date",
    },
    updatedDate: {
        type: sequelize_1.DataTypes.DATE,
        field: "updated_date",
    },
}, {
    timestamps: false,
    tableName: "Class",
});
exports.Class = Class;
Class.hasMany(user_model_1.User, { foreignKey: "classId" });
user_model_1.User.belongsTo(Class, { foreignKey: "id", as: "class" });
