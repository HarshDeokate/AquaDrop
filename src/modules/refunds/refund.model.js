import mongoose from "mongoose";

const { Schema, model } = mongoose;

const refundSchema = new Schema(
  {
    paymentId: {
      type: Schema.Types.ObjectId,
      ref: "Payment",
      required: true,
    },

    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    amountPaise: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: Number.isSafeInteger,
        message: "Refund amount must be a safe integer in paise",
      },
    },

    reason: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["REQUESTED", "PROCESSING", "SUCCEEDED", "FAILED"],
      default: "REQUESTED",
    },

    providerRefundId: {
      type: String,
      trim: true,
    },

    processedAt: {
      type: Date,
    },

    initiatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

refundSchema.index({ paymentId: 1, createdAt: -1 });

const Refund = model("Refund", refundSchema);

export default Refund;