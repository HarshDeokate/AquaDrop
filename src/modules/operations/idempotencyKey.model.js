import mongoose from "mongoose";

const { Schema, model } = mongoose;

const idempotencyKeySchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      trim: true,
    },

    scope: {
      type: String,
      required: true,
      trim: true,
    },

    requestHash: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["PROCESSING", "COMPLETED", "FAILED"],
      default: "PROCESSING",
    },

    response: {
      type: Schema.Types.Mixed,
    },

    expiresAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

idempotencyKeySchema.index(
  { scope: 1, key: 1 },
  { unique: true }
);

idempotencyKeySchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

const IdempotencyKey = model(
  "IdempotencyKey",
  idempotencyKeySchema
);

export default IdempotencyKey;