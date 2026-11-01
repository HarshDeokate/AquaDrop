import mongoose from "mongoose";

const { Schema, model } = mongoose;

const waterBatchSchema = new Schema(
  {
    batchNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    supplierId: {
      type: Schema.Types.ObjectId,
      default: null,
    },

    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    sourceType: {
      type: String,
      enum: ["OWN_PRODUCTION", "SUPPLIER"],
    },

    productionDate: {
      type: Date,
    },

    expiryDate: {
      type: Date,
    },

    receivedQuantity: {
      type: Number,
      min: 0,
      validate: {
        validator: Number.isSafeInteger,
        message: "Received quantity must be a safe integer",
      },
    },

    releasedQuantity: {
      type: Number,
      min: 0,
      validate: {
        validator: Number.isSafeInteger,
        message: "Released quantity must be a safe integer",
      },
    },

    status: {
      type: String,
      enum: [
        "PENDING_TEST",
        "RELEASED",
        "QUARANTINED",
        "REJECTED",
        "EXPIRED",
      ],
      default: "PENDING_TEST",
    },

    certificateUrl: {
      type: String,
      trim: true,
    },

    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const WaterBatch = model("WaterBatch", waterBatchSchema);

export default WaterBatch;