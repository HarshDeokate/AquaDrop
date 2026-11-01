import mongoose from "mongoose";

const { Schema, model } = mongoose;

const notificationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: [
        "ORDER",
        "SUBSCRIPTION",
        "PAYMENT",
        "EVENT",
        "PROMOTION",
        "SYSTEM",
      ],
    },

    channel: {
      type: String,
      enum: [
        "IN_APP",
        "SMS",
        "WHATSAPP",
        "EMAIL",
        "PUSH",
      ],
    },

    title: {
      type: String,
      trim: true,
    },

    message: {
      type: String,
      trim: true,
    },

    referenceType: {
      type: String,
      trim: true,
    },

    referenceId: {
      type: Schema.Types.ObjectId,
    },

    status: {
      type: String,
      enum: [
        "PENDING",
        "SENT",
        "DELIVERED",
        "FAILED",
        "READ",
      ],
      default: "PENDING",
    },

    sentAt: {
      type: Date,
    },

    readAt: {
      type: Date,
    },

    providerMessageId: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

notificationSchema.index({ userId: 1, createdAt: -1 });
notificationSchema.index({ status: 1, createdAt: 1 });

const Notification = model("Notification", notificationSchema);

export default Notification;