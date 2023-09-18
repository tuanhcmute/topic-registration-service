import UserService from "../services/user.service";
import { Request, Response, NextFunction } from "express";
import { UserInstance } from "models/user.model";

export default class UserController {
  private userService: UserService = new UserService();

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users: UserInstance[] = await this.userService.getAllUsers();

      res.status(200).json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };
}
