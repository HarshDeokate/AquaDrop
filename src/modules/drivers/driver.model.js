
import mongoose from "mongoose";

const { Schema } = mongoose;

const driverSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    employeeCode: {
      type: String,
      trim: true,
      uppercase: true,
      sparse: true,
      unique: true,
    },

    licenseNumber: {
      type: String,
      trim: true,
    },

    licenseExpiry: Date,

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "SUSPENDED"],
      default: "ACTIVE",
    },

    currentVehicleId: {
      type: Schema.Types.ObjectId,
      ref: "Vehicle",
      default: null,
    },

    serviceZoneIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "ServiceZone",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Driver =
  mongoose.models.Driver || mongoose.model("Driver", driverSchema);

export default Driver;
