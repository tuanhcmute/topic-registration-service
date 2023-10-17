"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Division = void 0;
const db_config_1 = __importDefault(require("@configs/db.config"));
const sequelize_1 = require("sequelize");
const Division = db_config_1.default.define("division", {
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        field: "id",
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        field: "name",
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        field: "status",
    },
    position: {
        type: sequelize_1.DataTypes.STRING,
        field: "position",
    },
    startDate: {
        type: sequelize_1.DataTypes.DATE,
        field: "start_date",
    },
    detailedTime: {
        type: sequelize_1.DataTypes.DATE,
        field: "detailed_time",
    },
    topicId: {
        type: sequelize_1.DataTypes.STRING,
        field: "topic_id",
    },
    lectureId: {
        type: sequelize_1.DataTypes.STRING,
        field: "lecture_id",
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
    tableName: "Division",
});
exports.Division = Division;
