import mongoose from "mongoose";

const { Schema, model } = mongoose;

const complaintSchema = new Schema(
  {
    complaintNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      default: null,
    },

    category: {
      type: String,
      enum: [
        "LATE_DELIVERY",
        "QUALITY",
        "DAMAGED_JAR",
        "MISSING_ORDER",
        "PAYMENT",
        "DRIVER_BEHAVIOUR",
        "OTHER",
      ],
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"],
      default: "OPEN",
    },

    priority: {
      type: String,
      enum: ["LOW", "NORMAL", "HIGH", "URGENT"],
      default: "NORMAL",
    },

    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    resolution: {
      type: String,
      trim: true,
    },

    resolvedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

complaintSchema.index({ customerId: 1, createdAt: -1 });
complaintSchema.index({ status: 1, priority: 1 });

const Complaint = model("Complaint", complaintSchema);

export default Complaint;