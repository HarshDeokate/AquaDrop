
import mongoose from "mongoose";

const { Schema } = mongoose;

const inventoryTransactionSchema = new Schema(
  {
    transactionNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    type: {
      type: String,
      enum: [
        "PURCHASE",
        "PRODUCTION",
        "RESERVE",
        "RELEASE",
        "DISPATCH",
        "SALE",
        "RETURN",
        "DAMAGE",
        "ADJUSTMENT",
        "TRANSFER",
      ],
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
      validate: Number.isSafeInteger,
    },

    fromLocationId: Schema.Types.ObjectId,
    toLocationId: Schema.Types.ObjectId,

    referenceType: {
      type: String,
      enum: ["ORDER", "RESERVATION", "BATCH", "DELIVERY", "MANUAL"],
    },

    referenceId: Schema.Types.ObjectId,

    reason: String,

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    idempotencyKey: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

inventoryTransactionSchema.index({ productId: 1, createdAt: -1 });

inventoryTransactionSchema.index({
  referenceType: 1,
  referenceId: 1,
});

inventoryTransactionSchema.index(
  { idempotencyKey: 1 },
  {
    unique: true,
    partialFilterExpression: {
      idempotencyKey: { $type: "string" },
    },
  }
);

const InventoryTransaction =
  mongoose.models.InventoryTransaction ||
  mongoose.model("InventoryTransaction", inventoryTransactionSchema);

export default InventoryTransaction;
