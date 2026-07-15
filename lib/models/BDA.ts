import mongoose, { Schema } from 'mongoose';

const BDASchema = new Schema({
  id: { type: String, required: true, unique: true },
  vendorId: { type: String, required: true },
  type: { type: String, enum: ['ad_spend', 'logistics', 'listing_fee', 'marketing', 'other'], required: true },
  amount: { type: Number, required: true },
  description: { type: String, default: '' },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected', 'Deducted'], default: 'Pending' }
}, {
  timestamps: true,
});

export default mongoose.models.BDA || mongoose.model('BDA', BDASchema);
