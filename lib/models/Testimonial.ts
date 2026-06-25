import mongoose, { Schema } from 'mongoose';

const TestimonialSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number, required: true, default: 5 },
  text: { type: String, required: true },
  verified: { type: Boolean, default: true },
}, {
  timestamps: true,
});

export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
