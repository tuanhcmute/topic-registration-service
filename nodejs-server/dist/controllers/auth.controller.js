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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _models_1 = require("@models");
const jwt_util_1 = require("@utils/jwt.util");
const constants_1 = require("@configs/constants");
const passport_1 = __importDefault(require("passport"));
class AuthController {
    constructor() {
        this.handleGoogleLogin = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                // find user role by id
                const foundUser = yield _models_1.User.findByPk(user.id);
                const token = (0, jwt_util_1.createJwtToken)(user.id, (foundUser === null || foundUser === void 0 ? void 0 : foundUser.role) || String(constants_1.Role.STUDENT));
                const redirectUrl = req.query.state;
                res.redirect(`${redirectUrl}?token=${token}`);
            }
            catch (err) {
                console.log(err);
                next(err);
            }
        });
        this.getGoogleLogin = (req, res, next) => {
            try {
                let redirectUrl = req.query.redirectUrl;
                if (!redirectUrl) {
                    redirectUrl = "http://localhost:3000";
                }
                // Pass the redirectUrl as a query parameter to the Google authentication
                passport_1.default.authenticate("google", {
                    scope: ["profile"],
                    state: String(redirectUrl), // Pass the redirectUrl as state
                })(req, res, next);
            }
            catch (err) {
                next(err);
            }
        };
    }
}
exports.default = AuthController;
