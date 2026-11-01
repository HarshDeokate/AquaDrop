
import mongoose from "mongoose";

const { Schema } = mongoose;

const quoteItemSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
      validate: Number.isSafeInteger,
    },

    unitPricePaise: {
      type: Number,
      required: true,
      min: 0,
      validate: Number.isSafeInteger,
    },

    lineTotalPaise: {
      type: Number,
      required: true,
      min: 0,
      validate: Number.isSafeInteger,
    },
  },
  { _id: false }
);

const eventQuoteSchema = new Schema(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    version: {
      type: Number,
      required: true,
      min: 1,
      validate: Number.isSafeInteger,
    },

    items: {
      type: [quoteItemSchema],
      default: [],
      validate: {
        validator: (items) => items.length > 0,
        message: "A quote must contain at least one item.",
      },
    },

    deliveryFeePaise: {
      type: Number,
      default: 0,
      min: 0,
    },

    serviceFeePaise: {
      type: Number,
      default: 0,
      min: 0,
    },

    discountPaise: {
      type: Number,
      default: 0,
      min: 0,
    },

    taxPaise: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalPaise: {
      type: Number,
      required: true,
      min: 0,
    },

    validUntil: Date,

    status: {
      type: String,
      enum: [
        "DRAFT",
        "SENT",
        "ACCEPTED",
        "REJECTED",
        "EXPIRED",
        "SUPERSEDED",
      ],
      default: "DRAFT",
    },

    acceptedAt: Date,

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

eventQuoteSchema.index(
  { eventId: 1, version: 1 },
  { unique: true }
);

const EventQuote =
  mongoose.models.EventQuote ||
  mongoose.model("EventQuote", eventQuoteSchema);

export default EventQuote;
