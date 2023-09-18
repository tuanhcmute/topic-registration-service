"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const express_1 = require("express");
class AuthRoutes {
    constructor() {
        this.path = "/auth";
        this.router = (0, express_1.Router)();
        this.authController = new auth_controller_1.default();
        this.intitializeRoutes = () => {
            this.router.post(`${this.path}/login`, this.authController.login);
            this.router.post(`${this.path}/register`, this.authController.register);
            this.router.post(`${this.path}/forgot-passord`, this.authController.forgotPassword);
        };
        this.intitializeRoutes();
    }
}
exports.default = AuthRoutes;
