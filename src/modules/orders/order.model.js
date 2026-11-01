
import mongoose from "mongoose";

const { Schema } = mongoose;

const itemSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    skuSnapshot: { type: String, required: true },
    nameSnapshot: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    unitPricePaise: { type: Number, required: true, min: 0 },
    lineTotalPaise: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const orderSchema = new Schema(
  {
    orderNumber: {
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

    source: {
      type: String,
      enum: ["SUBSCRIPTION", "ONE_TIME", "EVENT", "ADMIN"],
      required: true,
    },

    subscriptionId: {
      type: Schema.Types.ObjectId,
      ref: "Subscription",
      default: null,
    },

    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      default: null,
    },

    scheduledDate: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}-\d{2}$/,
    },

    timeWindow: {
      start: Date,
      end: Date,
    },

    items: {
      type: [itemSchema],
      required: true,
      validate: {
        validator: (items) => items.length > 0,
        message: "An order must contain at least one item.",
      },
    },

    pricing: {
      subtotalPaise: { type: Number, required: true, min: 0 },
      discountPaise: { type: Number, default: 0, min: 0 },
      deliveryFeePaise: { type: Number, default: 0, min: 0 },
      depositChargedPaise: { type: Number, default: 0, min: 0 },
      taxPaise: { type: Number, default: 0, min: 0 },
      totalPaise: { type: Number, required: true, min: 0 },
    },

    status: {
      type: String,
      enum: [
        "PENDING",
        "CONFIRMED",
        "ALLOCATED",
        "OUT_FOR_DELIVERY",
        "DELIVERED",
        "DELIVERY_FAILED",
        "CANCELLED",
        "RETURNED",
      ],
      default: "PENDING",
    },

    paymentStatus: {
      type: String,
      enum: ["UNPAID", "PENDING", "PARTIALLY_PAID", "PAID", "REFUNDED"],
      default: "UNPAID",
    },

    paymentMethod: {
      type: String,
      enum: ["ONLINE", "COD", "BANK_TRANSFER"],
      default: "ONLINE",
    },

    deliveredAt: Date,
    cancelledAt: Date,
    cancellationReason: String,
    idempotencyKey: String,
    notes: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

orderSchema.index({ customerId: 1, createdAt: -1 });
orderSchema.index({ scheduledDate: 1, status: 1 });
orderSchema.index({ subscriptionId: 1, scheduledDate: 1 });
orderSchema.index({ eventId: 1 });

orderSchema.index(
  { idempotencyKey: 1 },
  {
    unique: true,
    partialFilterExpression: {
      idempotencyKey: { $type: "string" },
    },
  }
);

const Order =
  mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
