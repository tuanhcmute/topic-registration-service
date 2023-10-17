"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserNotFoundException extends Error {
    constructor(message = "User not found") {
        super(message);
        this.name = "UserNotFoundException";
        Object.setPrototypeOf(this, UserNotFoundException.prototype);
    }
}
exports.default = UserNotFoundException;
