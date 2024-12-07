import User from '../models/userModel';

export const createOrUpdateLinkedInUser = async (linkedInProfile) => {
  try {
    const user = await User.findOneAndUpdate(
      { linkedInId: linkedInProfile.id },
      {
        name: `${linkedInProfile.firstName} ${linkedInProfile.lastName}`,
        email: linkedInProfile.email,
        linkedInId: linkedInProfile.id,
        linkedInAccessToken: linkedInProfile.accessToken,
        profilePicture: linkedInProfile.profilePicture,
        status: 'active'
      },
      { upsert: true, new: true }
    );
    return user;
  } catch (error) {
    console.error('Error creating/updating user:', error);
    throw error;
  }
};

export const findUserById = async (id) => {
  return await User.findById(id);
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};