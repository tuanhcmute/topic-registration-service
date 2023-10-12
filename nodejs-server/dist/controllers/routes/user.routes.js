"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const _controllers_1 = require("@controllers");
class UserRoutes {
    constructor() {
        this.path = "/user";
        this.router = (0, express_1.Router)();
        this.userController = new _controllers_1.UserController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/profile`, this.userController.getProfile);
    }
}
exports.default = UserRoutes;
