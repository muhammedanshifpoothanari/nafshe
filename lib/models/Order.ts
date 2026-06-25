import mongoose, { Schema } from 'mongoose';

const OrderSchema = new Schema({
  id: { type: String, required: true, unique: true }, // e.g. '#10001'
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  shippingAddress: { type: String, required: true },
  city: { type: String, default: '' },
  postalCode: { type: String, default: '' },
  country: { type: String, default: 'Saudi Arabia' },
  vendor: { type: String, default: 'Nafshe HQ' },
  amount: { type: Number, required: true },
  items: [{
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, default: '' },
    brand: { type: String, default: '' }
  }],
  status: { type: String, enum: ['Pending', 'Processing', 'Shipped', 'Delivered'], default: 'Pending' },
  trackingId: { type: String, default: '' },
  date: { type: String, required: true }
}, {
  timestamps: true
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
