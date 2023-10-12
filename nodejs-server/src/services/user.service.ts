import ErrorMessages from "exceptions/ErrorMessages";
import { User, UserInstance } from "models/user.model";
import UserNotFoundException from "exceptions/UserNotFoundException";
import { error } from "console";

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
      console.log(error);
      throw err;
    }
  };
}

export default UserService;
