"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../configs/db.config"));
const User = db_config_1.default.define("user", {
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        field: "id",
    },
    code: {
        type: sequelize_1.DataTypes.STRING,
        field: "code",
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        field: "role",
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        field: "email",
    },
    imageUrl: {
        type: sequelize_1.DataTypes.STRING,
        field: "image_url",
    },
    fullname: {
        type: sequelize_1.DataTypes.STRING,
        field: "full_name",
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        field: "phone_number",
    },
    providerId: {
        type: sequelize_1.DataTypes.STRING,
        field: "provider_id",
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        field: "password",
    },
    provider: {
        type: sequelize_1.DataTypes.STRING,
        field: "provider",
    },
    biography: {
        type: sequelize_1.DataTypes.STRING,
        field: "biography",
    },
    schoolYear: {
        type: sequelize_1.DataTypes.DATE,
        field: "school_year",
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
    classId: {
        type: sequelize_1.DataTypes.STRING,
        field: "class_id",
    },
    specializationId: {
        type: sequelize_1.DataTypes.STRING,
        field: "specialization_id",
    },
    majorId: {
        type: sequelize_1.DataTypes.STRING,
        field: "major_id",
    },
}, {
    timestamps: false,
    tableName: "User",
});
exports.User = User;
