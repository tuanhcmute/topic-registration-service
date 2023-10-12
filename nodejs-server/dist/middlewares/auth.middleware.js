"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authFilter = void 0;
const jwt_util_1 = require("@utils/jwt.util");
const authFilter = (role) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = req.headers.authorization;
        if (!token) {
            return res
                .status(401)
                .json({ message: "Unauthorized, please login sdfusdufudk" });
        }
        if (token.toLocaleLowerCase().startsWith("bearer ")) {
            token = token.slice("bearer".length).trim();
        }
        const decoded = yield (0, jwt_util_1.verifyToken)(token);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized, please login" });
        }
        const roleUser = decoded.role;
        if (roleUser !== role) {
            return res
                .status(401)
                .json({ message: "Not enough privileges to access" });
        }
        next();
    }
    catch (err) {
        throw err;
    }
});
exports.authFilter = authFilter;
