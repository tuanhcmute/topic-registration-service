import { User, UserInstance } from "../models/user.model";
import db from "../configs/db.config";
import { Account, AccountInstance } from "../models/account.model";
import PasswordValidator from "password-validator";
import {
  ConfirmToken,
  ConfirmTokenInstance,
} from "../models/confirmToken.model";
import { generateConfirmToken } from "../utils/confirmToken.util";
import { CreateUserData } from "../params/user.params";
import { comparePasswords, hashPassword } from "../utils/bcypt.util";
import { createJwtToken, verifyToken } from "../utils/jwt.util";
import { sendTokenEmail } from "../utils/mail.util";
import {
  NotFoundError,
  PasswordNotCorrectError,
  UnauthorizedError,
  ValidatorError,
} from "../exceptions/AppError";
import { TokenExpiredError } from "jsonwebtoken";

export default class AuthService {
  // this function to confirm if the specified username is exist
  public checkDuplicatedUserName = async (
    username: string
  ): Promise<boolean> => {
    try {
      const foundAccount: AccountInstance | null = await Account.findOne({
        where: {
          username: username,
        },
      });

      if (!foundAccount) {
        return false; // the username was not found
      } else {
        return true; // the username was exist
      }
    } catch (error) {
      throw error;
    }
  };

  // A function to check if password is strong enough to store it into the database
  public checkPasswordPolicies = (pass: string): boolean => {
    const schema = new PasswordValidator();

    // Add properties to it
    schema
      .is()
      .min(8) // Minimum length 8
      .is()
      .max(100) // Maximum length 100
      .has()
      .uppercase(1) // Must have at least one uppercase letter
      .has()
      .lowercase(1) // Must have at least one lowercase letter
      .has()
      .digits(1) // Must have at least one digit
      .has()
      .not()
      .spaces(); // Should not have spaces

    const validationErrors: any[] | boolean = schema.validate(pass);

    // If there are validation errors, the password doesn't meet the policies, so return false
    if (!Array.isArray(validationErrors)) {
      return validationErrors;
    }
    // If there are validation errors, return fasle
    return false;
  };

  // save an account to the databse
  public saveAccount = async (userInfo: any): Promise<AccountInstance> => {
    const t = await db.transaction();

    try {
      const user: UserInstance = await User.create(
        {
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
          gender: userInfo.gender,
          dob: userInfo.dob,
        },
        { transaction: t }
      );
      // save account
      const account: AccountInstance = await Account.create(
        {
          userId: user.id,
          username: userInfo.username,
          password: userInfo.password,
          role: userInfo.role,
        },
        {
          transaction: t,
        }
      );

      await t.commit();

      return account;
    } catch (err) {
      console.error(err);
      await t.rollback();
      throw err;
    }
  };

  public registerUser = async (data: CreateUserData): Promise<string> => {
    try {
      //Check if the username is already exists
      const isUsernameTaken: boolean = await this.checkDuplicatedUserName(
        data.username
      );
      if (isUsernameTaken) {
        throw new ValidatorError("The Username already exists", 400);
      }
      // Password validation
      const isValidPassword: boolean = this.checkPasswordPolicies(
        data.password
      );
      if (!isValidPassword) {
        throw new ValidatorError("Invalid password", 400);
      }
      // Hash the password
      const hashedPassword = await hashPassword(data.password);
      // Save account
      const account: AccountInstance = await this.saveAccount({
        ...data,
        password: hashedPassword,
      });
      // create jwt token
      const token = createJwtToken(account.id!, account.role);
      // create token instance
      const confirmToken: ConfirmTokenInstance = await this.createToken(
        account.id!
      );
      // send email code
      await sendTokenEmail(data.email, confirmToken.token);

      return token;
    } catch (err) {
      throw err;
    }
  };

  public createToken = async (
    accountId: number
  ): Promise<ConfirmTokenInstance> => {
    const confirmToken: ConfirmTokenInstance = await ConfirmToken.create({
      token: generateConfirmToken(),
      expiredTime: new Date(Date.now() + 15 * 60 * 1000),
      accountId: accountId,
    });
    return confirmToken;
  };

  public loginWithJwtToken = async (token: string): Promise<string> => {
    try {
      const decodedData = await verifyToken(token);

      const account = await Account.findByPk(decodedData.id);

      if (!account) {
        throw new NotFoundError("Account not found", 404);
      }

      if (!account.enable) {
        throw new UnauthorizedError("Account not authorized", 403);
      }

      return token;
    } catch (err) {
      throw err;
    }
  };

  public loginWithUsernamePassword = async (
    username: string,
    password: string
  ): Promise<string> => {
    try {
      const foundAccount: AccountInstance | null = await Account.findOne({
        where: { username: username },
      });

      if (!foundAccount) {
        throw new NotFoundError("Account not found", 404);
      } else {
        if (await comparePasswords(password, foundAccount.password)) {
          const token = createJwtToken(foundAccount.id!, foundAccount.role);
          return token;
        } else {
          throw new PasswordNotCorrectError("Password Incorrect", 400);
        }
      }
    } catch (err) {
      throw err;
    }
  };
}
