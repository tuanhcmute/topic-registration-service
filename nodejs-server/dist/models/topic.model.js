"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Topic = void 0;
const db_config_1 = __importDefault(require("../configs/db.config"));
const sequelize_1 = require("sequelize");
const Topic = db_config_1.default.define("topic", {
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
    type: {
        type: sequelize_1.DataTypes.STRING,
        field: "type",
    },
    goal: {
        type: sequelize_1.DataTypes.STRING,
        field: "goal",
    },
    expectation: {
        type: sequelize_1.DataTypes.STRING,
        field: "expectation",
    },
    requirement: {
        type: sequelize_1.DataTypes.STRING,
        field: "requirement",
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        field: "status",
    },
    maxSlot: {
        type: sequelize_1.DataTypes.INTEGER,
        field: "max_slot",
    },
    restSlot: {
        type: sequelize_1.DataTypes.INTEGER,
        field: "rest_slot",
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
    semesterId: {
        type: sequelize_1.DataTypes.STRING,
        field: "semester_id",
    },
    lecturerId: {
        type: sequelize_1.DataTypes.STRING,
        field: "lecturer_id",
    },
    specializationId: {
        type: sequelize_1.DataTypes.STRING,
        field: "specialization",
    },
}, {
    timestamps: false,
    tableName: "Topic",
});
exports.Topic = Topic;
