
import mongoose from "mongoose";

const { Schema } = mongoose;

const subscriptionItemSchema = new Schema(
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
  },
  { _id: false }
);

const subscriptionSchema = new Schema(
  {
    subscriptionNumber: {
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

    addressId: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },

    items: {
      type: [subscriptionItemSchema],
      required: true,
      validate: {
        validator: (items) => items.length > 0,
        message: "A subscription must contain at least one item.",
      },
    },

    frequency: {
      type: {
        type: String,
        enum: ["DAILY", "INTERVAL", "WEEKLY", "CUSTOM_DAYS"],
        required: true,
      },

      intervalDays: {
        type: Number,
        min: 1,
        validate: Number.isSafeInteger,
      },

      daysOfWeek: {
        type: [
          {
            type: Number,
            min: 0,
            max: 6,
            validate: Number.isSafeInteger,
          },
        ],
        default: [],
      },
    },

    startDate: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}-\d{2}$/,
    },

    endDate: {
      type: String,
      match: /^\d{4}-\d{2}-\d{2}$/,
    },

    nextDeliveryDate: {
      type: String,
      match: /^\d{4}-\d{2}-\d{2}$/,
    },

    timezone: {
      type: String,
      default: "Asia/Kolkata",
    },

    status: {
      type: String,
      enum: [
        "PENDING",
        "ACTIVE",
        "PAUSED",
        "CANCELLED",
        "COMPLETED",
      ],
      default: "PENDING",
    },

    billingMode: {
      type: String,
      enum: ["PER_DELIVERY", "PREPAID", "MONTHLY_INVOICE"],
      default: "PER_DELIVERY",
    },

    paymentMethod: {
      type: String,
      enum: ["ONLINE", "COD", "BANK_TRANSFER"],
      default: "ONLINE",
    },

    pausedUntil: {
      type: String,
      match: /^\d{4}-\d{2}-\d{2}$/,
    },

    cancelledAt: Date,
    cancellationReason: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

subscriptionSchema.index({ customerId: 1, status: 1 });
subscriptionSchema.index({ status: 1, nextDeliveryDate: 1 });

const Subscription =
  mongoose.models.Subscription ||
  mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
