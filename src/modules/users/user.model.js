
import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    phone: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
      default: null,
    },

    name: {
      type: String,
      trim: true,
    },

    // Store the bcrypt hash, never the original password.
    passwordHash: {
      type: String,
      select: false,
    },

    roles: {
      type: [
        {
          type: String,
          enum: [
            "CUSTOMER",
            "DRIVER",
            "OPERATIONS",
            "ADMIN",
            "SUPER_ADMIN",
          ],
        },
      ],
      default: ["CUSTOMER"],
    },

    status: {
      type: String,
      enum: ["ACTIVE", "BLOCKED", "PENDING"],
      default: "ACTIVE",
    },

    lastLoginAt: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.index({ phone: 1 }, { unique: true });

userSchema.index(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: {
      email: { $type: "string" },
    },
  }
);

const User =
  mongoose.models.User || mongoose.model("User", userSchema);

export default User;
