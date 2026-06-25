import mongoose, { Schema } from 'mongoose';

const BrandSchema = new Schema({
  id: { type: String, required: true, unique: true }, // slug/id like 'chanel', 'dior'
  name: { type: String, required: true },
  name_display: { type: String },
  logo: { type: String, required: true },
  tagline: { type: String, required: true },
  description: { type: String, required: true },
  story: { type: String, required: true },
  featured: { type: Boolean, default: false },
  accentColor: { type: String },
  image: { type: String, required: true },
}, {
  timestamps: true,
});

export default mongoose.models.Brand || mongoose.model('Brand', BrandSchema);
