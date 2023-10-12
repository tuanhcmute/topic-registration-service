"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.keys = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.keys = {
    google: {
        clientId: process.env.CLIENT_ID || "clientId",
        clientSecret: process.env.CLIENT_SECRET || "secret",
        callbackURL: process.env.REDIRECT_URI || "uri",
    },
    session: {
        cookieKey: "ajsgfjsdjfhsdjfksdkfjksd",
    },
    db: {
        development: {
            dbName: process.env.DB_NAME || "authentication_demo",
            dbUser: process.env.DB_USER || "thanhduy",
            dbPassword: process.env.DB_PASSWORD || "root",
            dbHost: process.env.DB_HOST || "localhost",
        },
        test: {},
        production: {},
    },
};
