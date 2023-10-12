"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = exports.AuthRoutes = exports.HomeRoutes = void 0;
var home_routes_1 = require("./home.routes");
Object.defineProperty(exports, "HomeRoutes", { enumerable: true, get: function () { return __importDefault(home_routes_1).default; } });
var auth_routes_1 = require("./auth.routes");
Object.defineProperty(exports, "AuthRoutes", { enumerable: true, get: function () { return __importDefault(auth_routes_1).default; } });
var user_routes_1 = require("./user.routes");
Object.defineProperty(exports, "UserRoutes", { enumerable: true, get: function () { return __importDefault(user_routes_1).default; } });
