import { Request, Response, NextFunction } from "express";
import AuthService from "../services/auth.service";
import { AccountInstance } from "../models/account.model";
import { ConfirmTokenInstance } from "../models/confirmToken.model";
import UserService from "../services/user.service";
import AccountService from "../services/account.service";
import { getConfirmToken } from "../utils/confirmToken.util";
import { CreateUserData } from "../params/user.params";

export default class AuthController {
  public authService: AuthService = new AuthService();
  public userService: UserService = new UserService();
  public accountService: AccountService = new AccountService();
  // RERGISTER A NEW ACCOUNT CONTROLLER
  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userInfo = req.body as CreateUserData;

      const jwtToken = await this.authService.registerUser(userInfo);

      res.cookie("jwt", jwtToken);

      return res.status(201).json({ token: jwtToken });
    } catch (err) {
      return next(err);
    }
  };

  // LOGIN TO THE SYSTEM
  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token: string = req.cookies.jwt;

      try {
        // Attempt JWT authentication
        const authenticatedToken = await this.authService.loginWithJwtToken(
          token
        );

        // JWT authentication succeeded, return a success response
        return res.status(200).json({ token: authenticatedToken });
      } catch (jwtError) {
        // JWT authentication failed, try username and password
        const loginInfo = req.body as { password: string; username: string };
        const newToken = await this.authService.loginWithUsernamePassword(
          loginInfo.username,
          loginInfo.password
        );

        // Set the new JWT token as a cookie in the response
        res.cookie("jwt", newToken);

        // Return a success response
        return res.status(200).json({ msg: "Login successfully" });
      }
    } catch (err) {
      return next(err);
    }
  };

  // confirm account
  public confirmAccount = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // get account by username
      const account: AccountInstance =
        await this.accountService.getAccountByUsername(req.body.username);
      // get token by account and token
      const token: ConfirmTokenInstance = await getConfirmToken(
        account.id!,
        req.body.token
      );

      if (!token) {
        throw new Error("Token not found");
      } else {
        await this.accountService.updateAccountStatus(account);
        return res.status(201).json({ account });
      }
    } catch (err) {
      return next(err);
    }
  };

  public forgotPassword = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {};
}
