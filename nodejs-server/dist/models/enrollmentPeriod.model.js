"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentPeriod = void 0;
const db_config_1 = __importDefault(require("@configs/db.config"));
const sequelize_1 = require("sequelize");
const EnrollmentPeriod = db_config_1.default.define("enrollmentPeriod", {
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        field: "id",
    },
    code: {
        type: sequelize_1.DataTypes.STRING,
        field: "code",
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        field: "name",
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        field: "description",
    },
    startDate: {
        type: sequelize_1.DataTypes.DATE,
        field: "start_date",
    },
    endDate: {
        type: sequelize_1.DataTypes.DATE,
        field: "end_date",
    },
    active: {
        type: sequelize_1.DataTypes.STRING,
        field: "active",
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        field: "type",
    },
    period: {
        type: sequelize_1.DataTypes.STRING,
        field: "period",
    },
    semesterId: {
        type: sequelize_1.DataTypes.STRING,
        field: "semester_id",
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
    tableName: "EnrollmentPeriod",
});
exports.EnrollmentPeriod = EnrollmentPeriod;
