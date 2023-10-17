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
const _models_1 = require("@models");
const _exceptions_1 = require("@exceptions");
class UserService {
    constructor() {
        this.finUserById = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const foundUser = yield _models_1.User.findByPk(userId);
                if (!foundUser)
                    throw new _exceptions_1.UserNotFoundException(_exceptions_1.ErrorMessages.USER_NOT_FOUND + "with userId: " + userId);
                return foundUser;
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
        this.getProfileUserData = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const foundUser = yield _models_1.User.findByPk(userId, {
                    include: [
                        {
                            model: _models_1.Major,
                            as: "major",
                            attributes: ["code", "name"],
                        },
                        {
                            model: _models_1.Specialization,
                            as: "specialization",
                            attributes: ["code", "name"],
                        },
                        {
                            model: _models_1.Class,
                            as: "class",
                            attributes: ["code", "name"],
                        },
                    ],
                    attributes: [
                        "code",
                        "role",
                        "email",
                        "imageUrl",
                        "fullname",
                        "phoneNumber",
                        "biography",
                        "schoolYear",
                    ],
                });
                if (!foundUser)
                    throw new _exceptions_1.UserNotFoundException(_exceptions_1.ErrorMessages.USER_NOT_FOUND + "with userId: " + userId);
                return foundUser;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = UserService;
