
import bcrypt from "bcrypt";
import User from "./user.model.js";
import jwt from "jsonwebtoken";

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


export const loginUser = async ({ phone, password }) => {
  // 1. Find user and explicitly retrieve passwordHash
  const user = await User.findOne({ phone })
    .select("+passwordHash");

  // 2. Check whether user exists
  if (!user) {
    const error = new Error("Invalid phone number or password");
    error.statusCode = 401;
    throw error;
  }

  // 3. Check account status
  if (user.status !== "ACTIVE") {
    const error = new Error("Your account is not active");
    error.statusCode = 403;
    throw error;
  }

  // 4. Compare submitted password with stored hash
  const isPasswordValid = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!isPasswordValid) {
    const error = new Error("Invalid phone number or password");
    error.statusCode = 401;
    throw error;
  }

  // 5. Generate JWT access token
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  const token = jwt.sign(
    {
      userId: user._id.toString(),
      roles: user.roles,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "15m",
    }
  );

  // 6. Update last login time
  user.lastLoginAt = new Date();
  await user.save();

  // 7. Return token and safe user information
  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      roles: user.roles,
      status: user.status,
    },
  };
};

