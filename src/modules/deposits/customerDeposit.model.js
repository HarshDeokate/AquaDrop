
import mongoose from "mongoose";

const { Schema } = mongoose;

const customerDepositSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    jarId: {
      type: Schema.Types.ObjectId,
      ref: "Jar",
      default: null,
    },

    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      default: null,
    },

    type: {
      type: String,
      enum: [
        "DEPOSIT_COLLECTED",
        "DEPOSIT_REFUNDED",
        "DEPOSIT_APPLIED",
        "ADJUSTMENT",
      ],
      required: true,
    },

    amountPaise: {
      type: Number,
      required: true,
      min: 1,
      validate: Number.isSafeInteger,
    },

    status: {
      type: String,
      enum: ["PENDING", "POSTED", "REVERSED"],
      default: "POSTED",
    },

    reference: String,
    reason: String,

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

customerDepositSchema.index({ customerId: 1, createdAt: -1 });
customerDepositSchema.index({ jarId: 1, createdAt: -1 });

const CustomerDeposit =
  mongoose.models.CustomerDeposit ||
  mongoose.model("CustomerDeposit", customerDepositSchema);

export default CustomerDeposit;
