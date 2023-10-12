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
exports.passportSetup = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const keys_1 = require("./keys");
const user_model_1 = require("../models/user.model");
const uuid_1 = require("uuid");
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => {
    user_model_1.User.findByPk(id)
        .then((user) => {
        done(null, user); // Return the entire user object
    })
        .catch((err) => {
        done(err, null); // Handle errors if any
    });
});
exports.passportSetup = passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: keys_1.keys.google.clientId,
    clientSecret: keys_1.keys.google.clientSecret,
    callbackURL: keys_1.keys.google.callbackURL,
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [user, created] = yield user_model_1.User.findOrCreate({
            where: { providerId: profile.id },
            defaults: {
                id: (0, uuid_1.v4)(),
                providerId: profile.id,
                email: profile.emails ? profile.emails[0].value : "",
                imageUrl: profile._json.picture || "",
                fullname: profile.displayName,
            },
        });
        if (created) {
            console.log("New account created for " + user.providerId);
        }
        else {
            console.log("Existing user logged in: " + user.providerId);
        }
        done(null, user);
    }
    catch (err) {
        console.error("Error finding or creating user:", err);
    }
})));
