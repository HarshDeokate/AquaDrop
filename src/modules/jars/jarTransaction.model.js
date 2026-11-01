
import mongoose from "mongoose";

const { Schema } = mongoose;

const jarTransactionSchema = new Schema(
  {
    transactionNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    jarId: {
      type: Schema.Types.ObjectId,
      ref: "Jar",
      required: true,
    },

    type: {
      type: String,
      enum: [
        "ISSUED",
        "DELIVERED",
        "RETURNED",
        "TRANSFERRED",
        "SENT_FOR_CLEANING",
        "CLEANED",
        "FILLED",
        "DAMAGED",
        "RETIRED",
        "RECONCILIATION",
      ],
      required: true,
    },

    fromCustomerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      default: null,
    },

    toCustomerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      default: null,
    },

    fromLocationId: Schema.Types.ObjectId,
    toLocationId: Schema.Types.ObjectId,

    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      default: null,
    },

    deliveryStopId: {
      type: Schema.Types.ObjectId,
      ref: "DeliveryStop",
      default: null,
    },

    conditionBefore: String,
    conditionAfter: String,

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    idempotencyKey: String,
    notes: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

jarTransactionSchema.index({ jarId: 1, createdAt: -1 });
jarTransactionSchema.index({ orderId: 1 });

jarTransactionSchema.index(
  { idempotencyKey: 1 },
  {
    unique: true,
    partialFilterExpression: {
      idempotencyKey: { $type: "string" },
    },
  }
);

const JarTransaction =
  mongoose.models.JarTransaction ||
  mongoose.model("JarTransaction", jarTransactionSchema);

export default JarTransaction;
