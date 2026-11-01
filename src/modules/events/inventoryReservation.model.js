
import mongoose from "mongoose";

const { Schema } = mongoose;

const inventoryReservationSchema = new Schema(
  {
    reservationNumber: {
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

    serviceZoneId: {
      type: Schema.Types.ObjectId,
      ref: "ServiceZone",
    },

    neededOn: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}-\d{2}$/,
    },

    status: {
      type: String,
      enum: [
        "RESERVED",
        "ALLOCATED",
        "CONSUMED",
        "RELEASED",
        "EXPIRED",
      ],
      default: "RESERVED",
    },

    expiresAt: Date,

    releasedAt: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

inventoryReservationSchema.index({
  neededOn: 1,
  status: 1,
  productId: 1,
});

inventoryReservationSchema.index(
  { orderId: 1, productId: 1 },
  { unique: true }
);

const InventoryReservation =
  mongoose.models.InventoryReservation ||
  mongoose.model("InventoryReservation", inventoryReservationSchema);

export default InventoryReservation;
