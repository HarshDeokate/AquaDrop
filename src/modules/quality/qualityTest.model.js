import mongoose from "mongoose";

const { Schema, model } = mongoose;

const testResultSchema = new Schema(
  {
    parameter: {
      type: String,
      required: true,
      trim: true,
    },

    value: {
      type: Schema.Types.Mixed,
    },

    unit: {
      type: String,
      trim: true,
    },

    limit: {
      type: String,
      trim: true,
    },

    result: {
      type: String,
      enum: ["PASS", "FAIL", "PENDING"],
    },
  },
  { _id: false }
);

const qualityTestSchema = new Schema(
  {
    batchId: {
      type: Schema.Types.ObjectId,
      ref: "WaterBatch",
      required: true,
    },

    testDate: {
      type: Date,
      required: true,
    },

    laboratory: {
      type: String,
      trim: true,
    },

    testType: {
      type: String,
      trim: true,
    },

    results: {
      type: [testResultSchema],
      default: [],
    },

    overallResult: {
      type: String,
      enum: ["PASS", "FAIL", "PENDING"],
      default: "PENDING",
    },

    reportUrl: {
      type: String,
      trim: true,
    },

    reviewedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

qualityTestSchema.index({ batchId: 1, testDate: -1 });

const QualityTest = model("QualityTest", qualityTestSchema);

export default QualityTest;