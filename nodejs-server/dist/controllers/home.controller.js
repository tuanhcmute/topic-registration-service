"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HomeController {
    constructor() {
        this.showEmployeePage = (req, res) => {
            return res
                .status(200)
                .json({ message: "Access employee page successfully" });
        };
        this.showAdminPage = (req, res) => {
            return res.status(200).json({ message: "Access admin page successfully" });
        };
    }
}
exports.default = HomeController;
