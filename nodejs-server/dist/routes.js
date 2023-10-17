"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("@routes/index");
const apiRoutes = [
    new index_1.HomeRoutes(),
    new index_1.AuthRoutes(),
    new index_1.UserRoutes(),
];
exports.default = apiRoutes;
