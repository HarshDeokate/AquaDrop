
import mongoose from "mongoose";

const { Schema } = mongoose;

const inventoryBalanceSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    locationId: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    locationType: {
      type: String,
      enum: ["WAREHOUSE", "VEHICLE", "HUB"],
      required: true,
    },

    status: {
      type: String,
      enum: ["AVAILABLE", "RESERVED", "DAMAGED", "QUARANTINED"],
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
      validate: Number.isSafeInteger,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

inventoryBalanceSchema.index(
  {
    productId: 1,
    locationType: 1,
    locationId: 1,
    status: 1,
  },
  { unique: true }
);

const InventoryBalance =
  mongoose.models.InventoryBalance ||
  mongoose.model("InventoryBalance", inventoryBalanceSchema);

export default InventoryBalance;
