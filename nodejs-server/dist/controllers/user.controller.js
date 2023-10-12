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
const _services_1 = require("@services");
const constants_1 = require("@configs/constants");
class UserController {
    constructor() {
        this.userService = new _services_1.UserService();
        this.getProfile = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.getProfileUserData("1");
                const userProfile = {
                    message: "Get user profile successfully.",
                    statusCode: constants_1.StatusCode.OK,
                    data: user,
                };
                res.status(200).json(userProfile);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = UserController;
