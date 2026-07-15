import mongoose, { Schema } from 'mongoose';

const ApprovalRequestSchema = new Schema({
  id: { type: String, required: true, unique: true },
  vendorId: { type: String, required: true },
  type: { type: String, enum: ['product', 'category', 'bda'], required: true },
  action: { type: String, enum: ['create', 'update', 'delete'], required: true },
  targetId: { type: String },
  data: { type: Schema.Types.Mixed, required: true }, // Contains JSON of the proposed changes
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  feedback: { type: String, default: '' }
}, {
  timestamps: true,
});

export default mongoose.models.ApprovalRequest || mongoose.model('ApprovalRequest', ApprovalRequestSchema);
