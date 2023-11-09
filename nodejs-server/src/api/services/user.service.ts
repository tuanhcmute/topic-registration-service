import { StatusCodes } from "http-status-codes";
import { User, UserInstance, Major, Clazz, UserRole, Role } from "@models";
import { UserNotFoundException, ErrorMessages } from "@exceptions";
import {
  IResponseModel,
  IUserProfile,
  ResponseModelBuilder,
} from "@interfaces";

class UserService {
  public finUserById = async (userId: string): Promise<UserInstance> => {
    try {
      const foundUser = await User.findByPk(userId);
      if (!foundUser)
        throw new UserNotFoundException(
          ErrorMessages.USER_NOT_FOUND + "with userId: " + userId
        );
      return foundUser;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  public getUserProfile = async (
    email: string
  ): Promise<IResponseModel<IUserProfile>> => {
    try {
      // Get current user
      const foundUser = await User.findOne({
        where: { email },
        include: [
          {
            model: Major,
            as: "major",
            attributes: ["code", "name"],
          },
          {
            model: Clazz,
            as: "clazz",
            attributes: ["code", "description"],
          },
          {
            model: UserRole,
            as: "userRoles",
            include: [{ model: Role, as: "role", attributes: ["code"] }],
            attributes: {
              exclude: [
                "userId",
                "roleId",
                "createdBy",
                "createdDate",
                "updatedDate",
              ],
            },
          },
        ],
        attributes: [
          "ntid",
          "email",
          "imageUrl",
          "name",
          "phoneNumber",
          "biography",
          "schoolYear",
        ],
      });

      // Validate user
      if (!foundUser)
        throw new UserNotFoundException(
          ErrorMessages.USER_NOT_FOUND + "with email: " + email
        );
      const data: IUserProfile = {
        profile: foundUser,
      };

      // Buid response
      return new ResponseModelBuilder<IUserProfile>()
        .withMessage("User's profile has been successfully retrieved")
        .withStatusCode(StatusCodes.OK)
        .withData(data)
        .build();
    } catch (err) {
      throw err;
    }
  };

  public updateUserBio = async (
    userId: string,
    bio: string
  ): Promise<boolean> => {
    try {
      const foundUser = await User.findByPk(userId);
      if (!foundUser)
        throw new UserNotFoundException(
          ErrorMessages.USER_NOT_FOUND + "with userId: " + userId
        );
      foundUser.biography = bio;
      await foundUser.save();
      return true;
    } catch (error) {
      throw error;
    }
  };
}

export default UserService;
