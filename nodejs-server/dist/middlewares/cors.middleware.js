"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsMiddleware = void 0;
const index_1 = require("../configs/constants/index");
const corsMiddleware = (req, res, next) => {
    res.setHeader(index_1.ACCESS_CONTROL_ALLOW_ORIGIN, "*");
    res.setHeader(index_1.ACCESS_CONTROL_ALLOW_METHODS, `${index_1.HttpMethod.GET}, ${index_1.HttpMethod.POST}, ${index_1.HttpMethod.PUT}, ${index_1.HttpMethod.DELETE}`);
    res.setHeader(index_1.ACCESS_CONTROL_ALLOW_HEADERS, `${index_1.CONTENT_TYPE}, ${index_1.AUTHORIZATION}`);
    next();
};
exports.corsMiddleware = corsMiddleware;
