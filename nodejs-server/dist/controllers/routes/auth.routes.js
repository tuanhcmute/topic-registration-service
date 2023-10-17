"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const _controllers_1 = require("@controllers");
class AuthRoutes {
    constructor() {
        this.path = "oauth2";
        this.router = (0, express_1.Router)();
        this.authController = new _controllers_1.AuthController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`/${this.path}/google`, this.authController.getGoogleLogin);
        this.router.get(`/login/${this.path}/code/google`, passport_1.default.authenticate("google", {
            failureRedirect: "/error",
            session: false,
        }), this.authController.handleGoogleLogin);
    }
}
exports.default = AuthRoutes;
