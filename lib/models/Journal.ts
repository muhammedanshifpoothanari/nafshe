import mongoose, { Schema } from 'mongoose';

const JournalSchema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  excerpt: { type: String, default: '' },
  image: { type: String, default: '' },
  category: { type: String, default: 'Editorial' },
  author: { type: String, default: 'Nafshe Curators' },
  published: { type: Boolean, default: true }
}, {
  timestamps: true,
});

export default mongoose.models.Journal || mongoose.model('Journal', JournalSchema);
