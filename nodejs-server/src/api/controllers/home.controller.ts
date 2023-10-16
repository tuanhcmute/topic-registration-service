import { Request, Response } from "express";

export default class HomeController {
  public showEmployeePage = (req: Request, res: Response) => {
    return res
      .status(200)
      .json({ message: "Access employee page successfully" });
  };

  public showAdminPage = (req: Request, res: Response) => {
    return res.status(200).json({ message: "Access admin page successfully" });
  };
}
