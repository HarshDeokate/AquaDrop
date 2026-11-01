
import mongoose from "mongoose";

const { Schema } = mongoose;

const exceptionItemSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
      validate: Number.isSafeInteger,
    },
  },
  { _id: false }
);

const subscriptionExceptionSchema = new Schema(
  {
    subscriptionId: {
      type: Schema.Types.ObjectId,
      ref: "Subscription",
      required: true,
    },

    date: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}-\d{2}$/,
    },

    type: {
      type: String,
      enum: [
        "SKIP",
        "EXTRA",
        "QUANTITY_CHANGE",
        "ADDRESS_CHANGE",
      ],
      required: true,
    },

    items: {
      type: [exceptionItemSchema],
      default: [],
    },

    replacementAddressId: {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },

    reason: String,

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Only one exception document per subscription per date.
subscriptionExceptionSchema.index(
  { subscriptionId: 1, date: 1 },
  { unique: true }
);

const SubscriptionException =
  mongoose.models.SubscriptionException ||
  mongoose.model("SubscriptionException", subscriptionExceptionSchema);

export default SubscriptionException;
