import Profile, { IProfile } from "../models/profile.model";

class ProfileService {
  // Get Profile
 async getProfile(userId: string) {
  const profile = await Profile.findOne({ userId }).populate(
    "recommendationHistory.products"
  );

  if (!profile) {
    throw new Error("Profile not found.");
  }

  return profile;
}
  // Create or Update Profile
  async saveProfile(userId: string, data: Partial<IProfile>) {
    const profile = await Profile.findOneAndUpdate(
      { userId },
      {
        ...data,
        userId,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    return profile;
  }
}

export default new ProfileService();