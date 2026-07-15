import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema({
  id: { type: String, required: true, unique: true }, // Keeps backward compatibility with dynamic routing params
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, default: '' },
  images: [{ type: String }],
  colors: [{ type: String }],
  sizes: [{ type: String }],
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  tag: { type: String },
  stock: { type: Number, default: 10 },
  views: { type: Number, default: 0 },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'approved' },
  vendorId: { type: String, default: 'nafshe' },
  feedback: { type: String, default: '' },
  fulfillmentType: { type: String, enum: ['FBA', 'FBM'], default: 'FBM' },
  costPrice: { type: Number, default: 0 }
}, {
  timestamps: true,
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
