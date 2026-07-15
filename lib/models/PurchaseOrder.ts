import mongoose, { Schema } from 'mongoose';

const PurchaseOrderSchema = new Schema({
  id: { type: String, required: true, unique: true },
  vendorId: { type: String, required: true },
  items: [{
    productId: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    costPrice: { type: Number, required: true }
  }],
  status: { type: String, enum: ['Draft', 'Sent', 'Received', 'Cancelled'], default: 'Draft' },
  totalAmount: { type: Number, required: true }
}, {
  timestamps: true,
});

export default mongoose.models.PurchaseOrder || mongoose.model('PurchaseOrder', PurchaseOrderSchema);
