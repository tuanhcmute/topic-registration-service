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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const routes_1 = __importDefault(require("./routes"));
const _middlewares_1 = require("@middlewares");
const _configs_1 = require("@configs");
dotenv_1.default.config();
const app = (0, express_1.default)();
// middlewares
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)("tiny"));
app.use(_middlewares_1.corsMiddleware);
app.use((0, cookie_session_1.default)({
    maxAge: 10 * 60 * 1000,
    keys: [_configs_1.keys.session.cookieKey],
}));
//initialize passport
app.use(_configs_1.passportSetup.initialize());
app.use(_configs_1.passportSetup.session());
// routes
routes_1.default.forEach((route) => {
    app.use("/api/v1", route.router);
});
// Hanlde 404 error
app.use((req, res, next) => {
    res.status(404).json({ message: "Page not found" });
});
// add error handler
app.use(_middlewares_1.errorHandler);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Attempt to authenticate with the database (assuming 'db' is your database object)
        yield _configs_1.db.authenticate();
        console.log("Connection has been established successfully.");
        // If the database authentication is successful, start your Express.js application
        app.listen(process.env.PORT, () => {
            console.log("The app is listening on port " + process.env.PORT);
        });
    }
    catch (error) {
        // If there is an error during database authentication, catch and handle it here
        console.error("Unable to connect to the database:", error);
    }
}))();
