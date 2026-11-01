import mongoose from "mongoose";

const { Schema, model } = mongoose;

const couponSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      unique: true,
    },

    discountType: {
      type: String,
      enum: ["FIXED", "PERCENTAGE"],
      required: true,
    },

    discountValue: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: Number.isSafeInteger,
        message: "Discount value must be a safe integer",
      },
    },

    maximumDiscountPaise: {
      type: Number,
      min: 0,
    },

    minimumOrderPaise: {
      type: Number,
      default: 0,
      min: 0,
    },

    applicableProductIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],

    validFrom: {
      type: Date,
    },

    validUntil: {
      type: Date,
    },

    usageLimit: {
      type: Number,
      min: 1,
    },

    perCustomerLimit: {
      type: Number,
      min: 1,
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

const Coupon = model("Coupon", couponSchema);

export default Coupon;