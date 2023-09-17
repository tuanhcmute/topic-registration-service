import { Account } from "../models/account.model";
import { User, UserInstance } from "../models/user.model";

export default class UserService {
  public getAllUsers = async (): Promise<UserInstance[]> => {
    try {
      const users: UserInstance[] = await User.findAll({ include: Account });

      return users;
    } catch (err) {
      throw new Error("Can't get all users");
    }
  };

  public getUserById = async (userId: number): Promise<UserInstance | null> => {
    try {
      // Use the findByPk method to find a user by their ID
      const user = await User.findByPk(userId);
      return user; // Returns the user if found, or null if not found
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw error;
    }
  };
}
