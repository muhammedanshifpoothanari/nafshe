import mongoose, { Schema } from 'mongoose';

const VendorReturnSchema = new Schema({
  id: { type: String, required: true, unique: true },
  vendorId: { type: String, required: true },
  items: [{
    productId: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true }
  }],
  reason: { type: String, default: '' },
  status: { type: String, enum: ['Pending', 'Approved', 'Shipped', 'Completed'], default: 'Pending' }
}, {
  timestamps: true,
});

export default mongoose.models.VendorReturn || mongoose.model('VendorReturn', VendorReturnSchema);
