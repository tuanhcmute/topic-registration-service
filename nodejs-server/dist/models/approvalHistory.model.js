"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalHistory = void 0;
const db_config_1 = __importDefault(require("@configs/db.config"));
const sequelize_1 = require("sequelize");
const ApprovalHistory = db_config_1.default.define("approvalHistory", {
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        field: "id",
    },
    code: {
        type: sequelize_1.DataTypes.STRING,
        field: "code",
    },
    reason: {
        type: sequelize_1.DataTypes.STRING,
        field: "reason",
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        field: "status",
    },
    topicId: {
        type: sequelize_1.DataTypes.STRING,
        field: "topic_id",
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
    tableName: "ApprovalHistory",
});
exports.ApprovalHistory = ApprovalHistory;
