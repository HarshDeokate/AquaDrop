import mongoose from "mongoose";

const { Schema, model } = mongoose;

const auditLogSchema = new Schema(
  {
    actorUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    action: {
      type: String,
      required: true,
      trim: true,
    },

    entityType: {
      type: String,
      required: true,
      trim: true,
    },

    entityId: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    before: {
      type: Schema.Types.Mixed,
    },

    after: {
      type: Schema.Types.Mixed,
    },

    reason: {
      type: String,
      trim: true,
    },

    requestId: {
      type: String,
      trim: true,
    },

    ipAddress: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

auditLogSchema.index({
  entityType: 1,
  entityId: 1,
  createdAt: -1,
});

auditLogSchema.index({
  actorUserId: 1,
  createdAt: -1,
});

const AuditLog = model("AuditLog", auditLogSchema);

export default AuditLog;