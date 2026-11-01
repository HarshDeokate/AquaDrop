
import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    category: {
      type: String,
      enum: ["PACKAGED_WATER", "OTHER"],
      required: true,
    },

    volumeMl: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: Number.isSafeInteger,
        message: "Volume must be a whole number of millilitres.",
      },
    },

    containerType: {
      type: String,
      enum: ["RETURNABLE_JAR", "BOTTLE", "OTHER"],
      required: true,
    },

    returnable: {
      type: Boolean,
      default: false,
    },

    depositRequired: {
      type: Boolean,
      default: false,
    },

    defaultDepositPaise: {
      type: Number,
      default: 0,
      min: 0,
      validate: {
        validator: Number.isSafeInteger,
        message: "Deposit must be an integer in paise.",
      },
    },

    defaultPricePaise: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: Number.isSafeInteger,
        message: "Price must be an integer in paise.",
      },
    },

    inventoryTracked: {
      type: Boolean,
      default: true,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

productSchema.index({ category: 1, active: 1 });

const Product =
  mongoose.models.Product ||
  mongoose.model("Product", productSchema);

export default Product;
