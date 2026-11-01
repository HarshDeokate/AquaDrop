
import mongoose from "mongoose";

const { Schema } = mongoose;

const jarSchema = new Schema(
  {
    jarCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    status: {
      type: String,
      enum: [
        "AVAILABLE_EMPTY",
        "CLEANING",
        "FILLED",
        "READY",
        "ALLOCATED",
        "WITH_CUSTOMER",
        "IN_TRANSIT",
        "DAMAGED",
        "RETIRED",
      ],
      default: "AVAILABLE_EMPTY",
    },

    currentCustomerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      default: null,
    },

    currentLocationId: {
      type: Schema.Types.ObjectId,
      default: null,
    },

    condition: {
      type: String,
      enum: ["GOOD", "NEEDS_INSPECTION", "DAMAGED"],
      default: "GOOD",
    },

    lastSanitizedAt: Date,
    lastFilledAt: Date,
    retiredAt: Date,

    notes: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

jarSchema.index({ currentCustomerId: 1, status: 1 });
jarSchema.index({ status: 1, currentLocationId: 1 });

const Jar =
  mongoose.models.Jar || mongoose.model("Jar", jarSchema);

export default Jar;
