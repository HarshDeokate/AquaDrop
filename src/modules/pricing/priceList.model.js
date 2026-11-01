import mongoose from "mongoose";

const { Schema, model } = mongoose;

const priceListItemSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    unitPricePaise: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: Number.isSafeInteger,
        message: "Price must be a safe integer in paise",
      },
    },

    minimumQuantity: {
      type: Number,
      default: 1,
      min: 1,
      validate: {
        validator: Number.isSafeInteger,
        message: "Minimum quantity must be an integer",
      },
    },
  },
  { _id: false }
);

const priceListSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    customerType: {
      type: String,
      enum: ["HOUSEHOLD", "BUSINESS", "INSTITUTION", "EVENT", "ALL"],
      default: "ALL",
    },

    serviceZoneId: {
      type: Schema.Types.ObjectId,
      ref: "ServiceZone",
      default: null,
    },

    items: {
      type: [priceListItemSchema],
      default: [],
    },

    validFrom: {
      type: Date,
      required: true,
    },

    validUntil: {
      type: Date,
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

const PriceList = model("PriceList", priceListSchema);

export default PriceList;