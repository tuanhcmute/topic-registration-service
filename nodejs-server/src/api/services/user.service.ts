import { User, UserInstance, Major, Specialization, Class } from "@models";
import { UserNotFoundException, ErrorMessages } from "@exceptions";

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

  public getProfileUserData = async (userId: string): Promise<UserInstance> => {
    try {
      const foundUser = await User.findByPk(userId, {
        include: [
          {
            model: Major,
            as: "major",
            attributes: ["code", "name"],
          },
          {
            model: Specialization,
            as: "specialization",
            attributes: ["code", "name"],
          },
          {
            model: Class,
            as: "class",
            attributes: ["code", "name"],
          },
        ],
        attributes: [
          "code",
          "role",
          "email",
          "imageUrl",
          "fullname",
          "phoneNumber",
          "biography",
          "schoolYear",
        ],
      });
      if (!foundUser)
        throw new UserNotFoundException(
          ErrorMessages.USER_NOT_FOUND + "with userId: " + userId
        );
      return foundUser;
    } catch (err) {
      throw err;
    }
  };
}

export default UserService;