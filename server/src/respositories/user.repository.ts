import User, { IUser } from "../models/user.model";

class UserRepository {
  async create(userData: Partial<IUser>): Promise<IUser> {
    const user = new User(userData);
    return await user.save();
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  async findById(userId: string): Promise<IUser | null> {
    return await User.findById(userId);
  }

  async updateById(
    userId: string,
    updateData: Partial<IUser>
  ): Promise<IUser | null> {
    return await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async getAllUsers(): Promise<IUser[]> {
    return await User.find();
  }

  async deleteById(userId: string): Promise<IUser | null> {
    return await User.findByIdAndDelete(userId);
  }
}

export default new UserRepository();