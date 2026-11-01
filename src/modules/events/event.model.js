
import mongoose from "mongoose";

const { Schema } = mongoose;

const venueSnapshotSchema = new Schema(
  {
    recipientName: String,
    recipientPhone: String,
    addressLine1: String,
    area: String,
    city: String,
    state: String,
    pincode: String,
    coordinates: [Number],
  },
  { _id: false }
);

const eventSchema = new Schema(
  {
    eventNumber: {
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

    eventType: {
      type: String,
      enum: [
        "WEDDING",
        "BIRTHDAY",
        "CORPORATE",
        "RELIGIOUS",
        "SPORTS",
        "CONFERENCE",
        "OTHER",
      ],
      required: true,
    },

    eventName: {
      type: String,
      trim: true,
    },

    eventDate: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}-\d{2}$/,
    },

    venueAddressId: {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },

    venueAddressSnapshot: venueSnapshotSchema,

    guestCount: {
      type: Number,
      min: 1,
      validate: Number.isSafeInteger,
    },

    deliveryTime: Date,

    pickupRequired: {
      type: Boolean,
      default: false,
    },

    setupRequired: {
      type: Boolean,
      default: false,
    },

    requirements: String,

    status: {
      type: String,
      enum: [
        "REQUESTED",
        "QUOTED",
        "CONFIRMED",
        "PREPARING",
        "DISPATCHED",
        "COMPLETED",
        "CANCELLED",
      ],
      default: "REQUESTED",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

eventSchema.index({ customerId: 1, eventDate: 1 });
eventSchema.index({ eventDate: 1, status: 1 });

const Event =
  mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
