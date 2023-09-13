import { Request, Response, NextFunction } from "express";
import AuthService from "../services/auth.service";
import { AccountInstance } from "../models/account.model";
import { hashPassword } from "../utils/bcypt.util";
import { ConfirmTokenInstance } from "../models/confirmToken.model";
import { sendTokenEmail } from "../utils/mail.util";
import UserService from "../services/user.service";
import { UserInstance } from "../models/user.model";
import AccountService from "../services/account.service";
import { getConfirmToken } from "../utils/confirmToken.util";
import { createJwtToken, verifyToken } from "../utils/jwt.util";

export default class AuthController {
  public authService: AuthService = new AuthService();
  public userService: UserService = new UserService();
  public accountService: AccountService = new AccountService();
  // RERGISTER A NEW ACCOUNT CONTROLLER
  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userInfo = req.body;

      // Check if the username is already exists
      const isUsernameTaken: boolean =
        await this.authService.checkDuplicatedUserName(userInfo.username);

      if (isUsernameTaken || !userInfo.username) {
        throw new Error("The Username already exists");
      }

      // Password validation
      const isValidPassword: boolean = this.authService.checkPasswordPolicies(
        req.body.password
      );

      if (!isValidPassword) {
        throw new Error(
          "Invalid password. Password must meet policy requirements."
        );
      }

      // Hash the password
      const hashedPassword = await hashPassword(req.body.password);

      // // send email
      // await sendTokenEmail(req.body.email);

      // Save account
      const account: AccountInstance = await this.authService.saveAccount({
        ...req.body,
        password: hashedPassword,
      });

      // create jwt token
      const token = createJwtToken(account.id!, account.role);
      res.cookie("jwt", token);

      // create token instance
      const confirmToken: ConfirmTokenInstance =
        await this.authService.createToken(account.id!);

      // send email
      const user: UserInstance | null = await this.userService.getUserById(
        account.userId!
      );

      await sendTokenEmail(user?.email!, confirmToken.token);

      return res.status(201).json({ confirmToken });
    } catch (err) {
      if (err instanceof Error) {
        next(err);
      } else {
        res.status(400).json({ message: "Unexpected error" });
      }
    }
  };

  // LOGIN TO THE SYSTEM
  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.jwt;
      const data = await verifyToken(token);
      if (data.id) {
        const account: AccountInstance =
          await this.accountService.getAccountById(data.id);

        if (
          await this.authService.loggedIn(account.username, account.password)
        ) {
          res.status(200).json({ msg: "Login successful" });
        } else {
          res.status(401).json({ msg: "Login failure" });
        }
      } else {
        throw new Error("Expired token. Please refresh");
      }
    } catch (err) {
      if (err instanceof Error) {
        next(err);
      } else {
        res.status(400).json({ message: "Unexpected error" });
      }
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
        res.status(201).json({ account });
      }
    } catch (err) {
      if (err instanceof Error) {
        next(err);
      } else {
        res.status(400).json({ message: "Unexpected error" });
      }
    }
  };

  public forgotPassword = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {};
}
