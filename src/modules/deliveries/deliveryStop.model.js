
import mongoose from "mongoose";

const { Schema } = mongoose;

const deliveryStopSchema = new Schema(
  {
    runId: {
      type: Schema.Types.ObjectId,
      ref: "DeliveryRun",
      required: true,
    },

    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    sequence: {
      type: Number,
      required: true,
      min: 1,
      validate: Number.isSafeInteger,
    },

    status: {
      type: String,
      enum: [
        "PENDING",
        "ARRIVED",
        "DELIVERED",
        "FAILED",
        "SKIPPED",
      ],
      default: "PENDING",
    },

    arrivedAt: Date,
    completedAt: Date,

    failureReason: String,
    driverNotes: String,

    proofOfDelivery: {
      photoUrl: String,
      recipientName: String,
      recipientSignatureUrl: String,
    },

    jarCountDelivered: {
      type: Number,
      min: 0,
      validate: Number.isSafeInteger,
    },

    jarCountReturned: {
      type: Number,
      min: 0,
      validate: Number.isSafeInteger,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

deliveryStopSchema.index(
  { runId: 1, sequence: 1 },
  { unique: true }
);

deliveryStopSchema.index({ orderId: 1 });
deliveryStopSchema.index({ runId: 1, status: 1 });

const DeliveryStop =
  mongoose.models.DeliveryStop ||
  mongoose.model("DeliveryStop", deliveryStopSchema);

export default DeliveryStop;
