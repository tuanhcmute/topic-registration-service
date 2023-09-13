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
const user_model_1 = require("../models/user.model");
const db_config_1 = __importDefault(require("../configs/db.config"));
const account_model_1 = require("../models/account.model");
const password_validator_1 = __importDefault(require("password-validator"));
const bcypt_util_1 = require("../utils/bcypt.util");
class AuthService {
    constructor() {
        // this function to confirm if the specified username is exist
        this.checkDuplicatedUserName = (username) => __awaiter(this, void 0, void 0, function* () {
            try {
                const foundAccount = yield account_model_1.Account.findOne({
                    where: {
                        username: username,
                    },
                });
                if (!foundAccount) {
                    return false; // the username was not found
                }
                else {
                    return true; // the username was exist
                }
            }
            catch (error) {
                throw new Error("Can't communicate with database");
            }
        });
        // A function to check if password is strong enough to store it into the database
        this.checkPasswordPolicies = (pass) => {
            const schema = new password_validator_1.default();
            // Add properties to it
            schema
                .is()
                .min(8) // Minimum length 8
                .is()
                .max(100) // Maximum length 100
                .has()
                .uppercase(1) // Must have at least one uppercase letter
                .has()
                .lowercase(1) // Must have at least one lowercase letter
                .has()
                .digits(1) // Must have at least one digit
                .has()
                .not()
                .spaces(); // Should not have spaces
            const validationErrors = schema.validate(pass);
            // If there are validation errors, the password doesn't meet the policies, so return false
            if (!Array.isArray(validationErrors)) {
                return validationErrors;
            }
            // If there are validation errors, return fasle
            return false;
        };
        // save an account to the databse
        this.saveAccount = (userInfo) => __awaiter(this, void 0, void 0, function* () {
            const t = yield db_config_1.default.transaction();
            try {
                const user = yield user_model_1.User.create({
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    email: userInfo.email,
                    gender: userInfo.gender,
                    dob: userInfo.dob,
                }, { transaction: t });
                // save account
                const account = yield account_model_1.Account.create({
                    userId: user.id,
                    username: userInfo.username,
                    password: userInfo.password,
                    role: userInfo.role,
                }, {
                    transaction: t,
                });
                yield t.commit();
                return account;
            }
            catch (err) {
                console.error(err);
                yield t.rollback();
                throw err;
            }
        });
        this.loggedIn = (username, password) => __awaiter(this, void 0, void 0, function* () {
            try {
                const foundAccount = yield account_model_1.Account.findOne({
                    where: { username: username },
                });
                if (!foundAccount) {
                    throw new Error("Not found account");
                }
                else {
                    // TODO: check the password
                    const isCorrect = yield (0, bcypt_util_1.comparePasswords)(password, foundAccount.password);
                    if (isCorrect) {
                        return foundAccount;
                    }
                    else {
                        throw new Error("Password was not correct");
                    }
                }
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
}
exports.default = AuthService;
