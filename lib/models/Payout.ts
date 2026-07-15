import mongoose, { Schema } from 'mongoose';

const PayoutSchema = new Schema({
  id: { type: String, required: true, unique: true },
  vendorId: { type: String, required: true },
  periodStart: { type: Date, required: true },
  periodEnd: { type: Date, required: true },
  salesRevenue: { type: Number, required: true },
  nafsheCommission: { type: Number, required: true },
  bdaDeductions: { type: Number, required: true },
  taxAmount: { type: Number, required: true },
  payoutAmount: { type: Number, required: true },
  status: { type: String, enum: ['Calculated', 'Approved', 'Paid'], default: 'Calculated' }
}, {
  timestamps: true,
});

export default mongoose.models.Payout || mongoose.model('Payout', PayoutSchema);
