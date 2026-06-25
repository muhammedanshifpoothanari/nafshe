import mongoose, { Schema } from 'mongoose';

const StorySchema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  brand: { type: String },
  link: { type: String },
  products: [{ type: String }], // array of product IDs
  duration: { type: Number, default: 5 },
}, {
  timestamps: true,
});

export default mongoose.models.Story || mongoose.model('Story', StorySchema);
