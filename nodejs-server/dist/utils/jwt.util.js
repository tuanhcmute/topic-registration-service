"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs = __importStar(require("fs"));
dotenv_1.default.config();
const createJwtToken = (id, role) => {
    const privateKey = fs.readFileSync("private-key.pem", "utf8"); // Read the private key from a file
    const token = jsonwebtoken_1.default.sign({ exp: Math.floor(Date.now() / 1000) + 60 * 15, id: id, role: role }, privateKey, { algorithm: "RS256" } // Specify the signing algorithm (e.g., RS256 for RSA)
    );
    return token;
};
exports.createJwtToken = createJwtToken;
const verifyToken = (token) => {
    const publicKey = fs.readFileSync("public-key.pem", "utf8"); // Read the public key from a file
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, publicKey, { algorithms: ["RS256"] }, (err, decoded) => {
            if (err) {
                return reject(err);
            }
            return resolve(decoded);
        });
    });
};
exports.verifyToken = verifyToken;
