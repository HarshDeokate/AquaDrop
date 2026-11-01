
import mongoose from "mongoose";

const { Schema } = mongoose;

const customerSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    customerType: {
      type: String,
      enum: ["HOUSEHOLD", "BUSINESS", "INSTITUTION"],
      default: "HOUSEHOLD",
    },

    businessName: {
      type: String,
      trim: true,
    },

    taxDetails: {
      gstin: String,
      billingName: String,
    },

    defaultAddressId: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      default: null,
    },

    preferredPaymentMethod: {
      type: String,
      enum: ["ONLINE", "COD", "BANK_TRANSFER"],
      default: "ONLINE",
    },

    creditLimitPaise: {
      type: Number,
      default: 0,
      min: 0,
      validate: {
        validator: Number.isSafeInteger,
        message: "Credit limit must be an integer in paise.",
      },
    },

    notes: String,
    archivedAt: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

customerSchema.index({ customerType: 1, archivedAt: 1 });

const Customer =
  mongoose.models.Customer ||
  mongoose.model("Customer", customerSchema);

export default Customer;
