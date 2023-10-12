"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    const errorResponse = {
        message: "Internal server error",
        statusCode: 500,
    };
    console.log(err.message);
    res.status(500).json(errorResponse);
    next();
};
exports.errorHandler = errorHandler;
