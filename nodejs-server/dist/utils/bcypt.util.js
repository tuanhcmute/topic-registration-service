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
exports.comparePasswords = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
// create hash password
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            bcrypt_1.default.genSalt(10, (err, salt) => {
                if (err) {
                    reject(err);
                }
                bcrypt_1.default.hash(password, salt, (err, hash) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        console.log(hash);
                        resolve(hash);
                    }
                });
            });
        });
    });
}
exports.hashPassword = hashPassword;
// this function to compare password
function comparePasswords(plaintextPassword, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const match = yield bcrypt_1.default.compare(plaintextPassword, hashedPassword);
            return match;
        }
        catch (error) {
            // Handle any errors that may occur during the comparison
            throw new Error("Password comparison failed");
        }
    });
}
exports.comparePasswords = comparePasswords;
