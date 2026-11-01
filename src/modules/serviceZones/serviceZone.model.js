import mongoose from "mongoose";

const { Schema, model } = mongoose;

const serviceZoneSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    pincodes: {
      type: [String],
      default: [],
    },

    boundary: {
      type: {
        type: String,
        enum: ["Polygon", "MultiPolygon"],
      },

      coordinates: {
        type: Schema.Types.Mixed,
      },
    },

    deliveryFeePaise: {
      type: Number,
      default: 0,
      min: 0,
      validate: {
        validator: Number.isSafeInteger,
        message: "Delivery fee must be a safe integer in paise",
      },
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ServiceZone = model("ServiceZone", serviceZoneSchema);

export default ServiceZone;