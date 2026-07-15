import mongoose, { Schema } from 'mongoose';

const CouponSchema = new Schema({
  code: { type: String, required: true, unique: true },
  vendorId: { type: String, default: null }, // Null means global coupon, otherwise vendor-specific
  discountType: { type: String, enum: ['percentage', 'fixed'], required: true },
  value: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  active: { type: Boolean, default: true }
}, {
  timestamps: true,
});

export default mongoose.models.Coupon || mongoose.model('Coupon', CouponSchema);
