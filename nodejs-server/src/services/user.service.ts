import { NotFoundError } from "../exceptions/AppError";
import { User, UserInstance } from "../models/user.model";

export default class UserService {
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

  public getUserByEmail = async (email: string): Promise<UserInstance> => {
    try {
      // Use the findOne method to find a user by their email
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        throw new NotFoundError("User not found", 404);
      }
      return user; // Returns the user if found, or null if not found
    } catch (error) {
      console.error("Error fetching user by email:", error);
      throw error;
    }
  };

  public updateUserStatus = async (user: UserInstance): Promise<void> => {
    try {
      await User.update({ enable: true }, { where: { id: user.id } });
    } catch (err) {
      throw err;
    }
  };
}
