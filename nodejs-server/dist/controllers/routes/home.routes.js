"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const _controllers_1 = require("@controllers");
class HomeRoutes {
    constructor() {
        this.path = "/home";
        this.router = (0, express_1.Router)();
        this.homeConTroller = new _controllers_1.HomeController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/student`, this.homeConTroller.showEmployeePage);
        this.router.get(`${this.path}/teacher`, this.homeConTroller.showAdminPage);
    }
}
exports.default = HomeRoutes;
