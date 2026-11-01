
import mongoose from "mongoose";

const { Schema } = mongoose;

const paymentSchema = new Schema(
  {
    paymentNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    amountPaise: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: Number.isSafeInteger,
        message: "Payment amount must be an integer in paise.",
      },
    },

    method: {
      type: String,
      enum: ["ONLINE", "COD", "BANK_TRANSFER"],
      required: true,
    },

    provider: String,
    providerOrderId: String,
    providerPaymentId: String,

    status: {
      type: String,
      enum: ["CREATED", "PENDING", "SUCCEEDED", "FAILED", "CANCELLED"],
      default: "CREATED",
    },

    paidAt: Date,
    failureCode: String,
    failureMessage: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

paymentSchema.index({ orderId: 1, createdAt: -1 });

paymentSchema.index(
  { providerPaymentId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      providerPaymentId: { $type: "string" },
    },
  }
);

const Payment =
  mongoose.models.Payment ||
  mongoose.model("Payment", paymentSchema);

export default Payment;
