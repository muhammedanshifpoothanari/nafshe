import mongoose, { Schema } from 'mongoose';

const VendorSchema = new Schema({
  id: { type: String, required: true, unique: true }, // e.g. 'dior', 'chanel', 'luxury-brands-co'
  name: { type: String, required: true },
  email: { type: String, required: true },
  category: { type: String, default: '' },
  sales: { type: String, default: '₹0' },
  status: { type: String, enum: ['Active', 'Pending', 'Suspended'], default: 'Pending' },
  sync: { type: String, default: 'Disconnected' },
  tier: { type: String, default: 'Standard' },
  commissionRate: { type: Number, default: 15 },
  taxId: { type: String, default: '' },
  bankAccount: { type: String, default: '' },
  passwordHash: { type: String, default: '' },
  consignment: { type: Boolean, default: false }
}, {
  timestamps: true,
});

export default mongoose.models.Vendor || mongoose.model('Vendor', VendorSchema);
