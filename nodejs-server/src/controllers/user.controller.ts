import UserService from "../services/user.service";
import { Request, Response, NextFunction } from "express";
import { UserInstance } from "models/user.model";

export default class UserController {
  private userService: UserService = new UserService();

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ msg: "get all users" });
  };
}
