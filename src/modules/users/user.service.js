
import bcrypt from "bcrypt";
import User from "./user.model.js";

export const registerUser = async (userData) => {
  const { name, phone, email, password } = userData;

  // 1. Check for an existing account
  const existingUser = await User.findOne({
    $or: [{ phone }, { email }],
  }).select("phone email");

  if (existingUser) {
    if (existingUser.phone === phone) {
      const error = new Error(
        "This phone number is already registered"
      );
      error.statusCode = 409;
      throw error;
    }

    if (existingUser.email === email) {
      const error = new Error(
        "This email address is already registered"
      );
      error.statusCode = 409;
      throw error;
    }
  }

  // 2. Hash the password
  const passwordHash = await bcrypt.hash(password, 12);

  // 3. Create the user
  const user = await User.create({
    name,
    phone,
    email,
    passwordHash,
  });

  // 4. Return only safe user information
  return {
    id: user._id,
    name: user.name,
    phone: user.phone,
    email: user.email,
    roles: user.roles,
    status: user.status,
    createdAt: user.createdAt,
  };
};
