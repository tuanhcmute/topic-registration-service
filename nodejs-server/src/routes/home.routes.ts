import { Router } from "express";
import Routes from "../interfaces/routes.interface";
import HomeController from "../controllers/home.controller";
import { authFilter } from "../middlewares/auth.middleware";

export default class HomeRoutes implements Routes {
  public path = "/home";
  public router = Router();
  private homeConTroller: HomeController = new HomeController();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.get(
      `${this.path}/student`,
      this.homeConTroller.showEmployeePage
    );
    this.router.get(`${this.path}/teacher`, this.homeConTroller.showAdminPage);
  }
}
