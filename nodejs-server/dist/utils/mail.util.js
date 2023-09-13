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
const mail_config_1 = require("../configs/mail.config");
const createConfirmToken = () => {
    return "sdhffd";
};
const sendTokenEmail = (receiver) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        from: '"Bui Admin" <8ea47141fa-188f3c@inbox.mailtrap.io>',
        to: receiver,
        subject: "Hello",
        text: "Hello world?",
        html: "<b>Hello world?</b>",
    };
    const info = yield mail_config_1.transporter.sendMail(options);
    console.log(info.messageId);
});
