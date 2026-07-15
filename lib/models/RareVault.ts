import mongoose, { Schema } from 'mongoose';

const RareVaultSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  price: { type: Number, required: true },
  vendorId: { type: String, required: true },
  rarityScore: { type: Number, default: 99 },
  status: { type: String, enum: ['available', 'locked', 'sold'], default: 'available' }
}, {
  timestamps: true,
});

export default mongoose.models.RareVault || mongoose.model('RareVault', RareVaultSchema);
