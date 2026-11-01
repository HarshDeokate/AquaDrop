
import mongoose from "mongoose";

const { Schema } = mongoose;

const deliveryRunSchema = new Schema(
  {
    runNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    driverId: {
      type: Schema.Types.ObjectId,
      ref: "Driver",
      required: true,
    },

    vehicleId: {
      type: Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },

    serviceDate: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}-\d{2}$/,
    },

    status: {
      type: String,
      enum: [
        "PLANNED",
        "ASSIGNED",
        "IN_PROGRESS",
        "COMPLETED",
        "CANCELLED",
      ],
      default: "PLANNED",
    },

    startedAt: Date,
    completedAt: Date,

    notes: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

deliveryRunSchema.index({ serviceDate: 1, status: 1 });
deliveryRunSchema.index({ driverId: 1, serviceDate: 1 });
deliveryRunSchema.index({ vehicleId: 1, serviceDate: 1 });

const DeliveryRun =
  mongoose.models.DeliveryRun ||
  mongoose.model("DeliveryRun", deliveryRunSchema);

export default DeliveryRun;
