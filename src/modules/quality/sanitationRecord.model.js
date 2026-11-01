import mongoose from "mongoose";

const { Schema, model } = mongoose;

const sanitationRecordSchema = new Schema(
  {
    jarId: {
      type: Schema.Types.ObjectId,
      ref: "Jar",
      required: true,
    },

    processedAt: {
      type: Date,
      required: true,
    },

    processType: {
      type: String,
      enum: ["CLEANING", "SANITIZATION", "INSPECTION"],
    },

    result: {
      type: String,
      enum: ["PASS", "FAIL"],
      required: true,
    },

    performedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

sanitationRecordSchema.index({ jarId: 1, processedAt: -1 });

const SanitationRecord = model(
  "SanitationRecord",
  sanitationRecordSchema
);

export default SanitationRecord;