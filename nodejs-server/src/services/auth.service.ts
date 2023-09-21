import { User, UserInstance } from "../models/user.model";
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

export default class AuthService {
  // this function to confirm if the specified username is exist
  public checkDuplicatedUserName = async (email: string): Promise<boolean> => {
    try {
      const foundUser: UserInstance | null = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!foundUser) {
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

  public registerUser = async (data: CreateUserData): Promise<string> => {
    try {
      //Check if the username is already exists
      const isEmailTaken: boolean = await this.checkDuplicatedUserName(
        data.email
      );
      if (isEmailTaken) {
        throw new ValidatorError("The email already used", 400);
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
      const user: UserInstance = await User.create({
        ...data,
        password: hashedPassword,
        enable: false, // defaul user account was not activated
      });
      // create jwt token
      const token = createJwtToken(user.id!, user.role);
      // create token instance
      const confirmToken: ConfirmTokenInstance = await this.createToken(
        user.id!
      );
      // send email code
      await sendTokenEmail(data.email, confirmToken.token);
      return token;
    } catch (err) {
      throw err;
    }
  };

  public createToken = async (
    userId: number
  ): Promise<ConfirmTokenInstance> => {
    const confirmToken: ConfirmTokenInstance = await ConfirmToken.create({
      token: generateConfirmToken(),
      expiredTime: new Date(Date.now() + 15 * 60 * 1000),
      userId: userId,
    });
    return confirmToken;
  };

  public loginWithJwtToken = async (token: string): Promise<string> => {
    try {
      // get payload after verifying token
      const decodedData = await verifyToken(token);
      // find user with id extract from decoded data
      const user = await User.findByPk(decodedData.id);
      if (!user) {
        throw new NotFoundError("Account not found", 404);
      }
      // check if user account was activated, throw 403 error
      if (!user.enable) {
        throw new UnauthorizedError("Account not authorized", 403);
      }
      return token;
    } catch (err) {
      throw err;
    }
  };

  public loginWithUsernamePassword = async (
    email: string,
    password: string
  ): Promise<string> => {
    try {
      const foundUser: UserInstance | null = await User.findOne({
        where: { email: email },
      });

      if (!foundUser) {
        throw new NotFoundError("Account not found", 404);
      } else {
        if (await comparePasswords(password, foundUser.password!)) {
          const token = createJwtToken(foundUser.id!, foundUser.role);
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
