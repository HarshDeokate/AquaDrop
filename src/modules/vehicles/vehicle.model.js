
import mongoose from "mongoose";

const { Schema } = mongoose;

const capacityUnitSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    maxQuantity: {
      type: Number,
      required: true,
      min: 0,
      validate: Number.isSafeInteger,
    },
  },
  { _id: false }
);

const vehicleSchema = new Schema(
  {
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    vehicleType: {
      type: String,
      enum: ["BIKE", "THREE_WHEELER", "VAN", "TRUCK"],
      required: true,
    },

    capacityUnits: {
      type: [capacityUnitSchema],
      default: [],
    },

    maxPayloadKg: {
      type: Number,
      min: 0,
    },

    status: {
      type: String,
      enum: ["AVAILABLE", "ASSIGNED", "MAINTENANCE", "INACTIVE"],
      default: "AVAILABLE",
    },

    notes: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Vehicle =
  mongoose.models.Vehicle ||
  mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;
