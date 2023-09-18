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
const auth_service_1 = __importDefault(require("../services/auth.service"));
const bcypt_util_1 = require("../utils/bcypt.util");
class AuthController {
    constructor() {
        this.authService = new auth_service_1.default();
        // RERGISTER A NEW ACCOUNT CONTROLLER
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userInfo = req.body;
                // Check if the username is already exists
                const isUsernameTaken = yield this.authService.checkDuplicatedUserName(userInfo.username);
                if (isUsernameTaken || !userInfo.username) {
                    throw new Error("The Username already exists");
                }
                // Password validation
                const isValidPassword = this.authService.checkPasswordPolicies(req.body.password);
                if (!isValidPassword) {
                    throw new Error("Invalid password. Password must meet policy requirements.");
                }
                // Hash the password
                const hashedPassword = yield (0, bcypt_util_1.hashPassword)(req.body.password);
                // Save account
                const account = yield this.authService.saveAccount(Object.assign(Object.assign({}, req.body), { password: hashedPassword }));
                return res.status(201).json({ account });
            }
            catch (err) {
                console.error(err);
                if (err instanceof Error) {
                    // 'err' is now treated as an 'Error' type
                    res.status(400).json({ error: err.message || "Unexpected error" });
                }
                else {
                    // Handle other error cases here if needed
                    res.status(500).json({ error: "Internal server error" });
                }
            }
        });
        // LOGIN TO THE SYSTEM
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                // get information from the request
                const loginInfo = req.body;
                // authenticate the user
                const account = yield this.authService.loggedIn(loginInfo.username, loginInfo.password);
                return res
                    .status(200)
                    .json({ message: "Login successful", account: account });
            }
            catch (err) {
                if (err instanceof Error) {
                    return res
                        .status(400)
                        .json({ message: err.message || "Unexpected error" });
                }
                else {
                    return res.status(500).json({ message: "External server error" });
                }
            }
        });
        this.forgotPassword = (req, res, next) => { };
    }
}
exports.default = AuthController;
