import { Router } from "express";
import { IRoutes } from "@interfaces";
import { HomeController } from "@controllers";

export default class HomeRoutes implements IRoutes {
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
