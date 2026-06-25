import mongoose, { Schema } from 'mongoose';

const CartSchema = new Schema({
  sessionId: { type: String, required: true, unique: true },
  email: { type: String, default: '' },
  items: [{
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, default: '' },
    brand: { type: String, default: '' }
  }],
  total: { type: Number, default: 0 },
  converted: { type: Boolean, default: false }
}, {
  timestamps: true
});

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema);
