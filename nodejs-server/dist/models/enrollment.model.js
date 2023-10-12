"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enrollment = void 0;
const db_config_1 = __importDefault(require("@configs/db.config"));
const sequelize_1 = require("sequelize");
const Enrollment = db_config_1.default.define("enrollment", {
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        field: "id",
    },
    topicId: {
        type: sequelize_1.DataTypes.STRING,
        field: "topic_id",
    },
    studentId: {
        type: sequelize_1.DataTypes.STRING,
        field: "student_id",
    },
    createdDate: {
        type: sequelize_1.DataTypes.DATE,
        field: "created_date",
    },
    updatedDate: {
        type: sequelize_1.DataTypes.DATE,
        field: "updated_date",
    },
    createdBy: {
        type: sequelize_1.DataTypes.STRING,
        field: "created_by",
    },
}, {
    timestamps: false,
    tableName: "Enrollment",
});
exports.Enrollment = Enrollment;
