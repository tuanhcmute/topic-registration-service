"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Specialization = void 0;
const db_config_1 = __importDefault(require("../configs/db.config"));
const sequelize_1 = require("sequelize");
const user_model_1 = require("./user.model");
const Specialization = db_config_1.default.define("Specialization", {
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
    name: {
        type: sequelize_1.DataTypes.STRING,
        field: "name",
    },
}, {
    timestamps: false,
    tableName: "Specialization",
});
exports.Specialization = Specialization;
Specialization.hasMany(user_model_1.User, { foreignKey: "specializationId" });
user_model_1.User.belongsTo(Specialization, { foreignKey: "id", as: "specialization" });
