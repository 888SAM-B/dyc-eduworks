import mongoose from 'mongoose';

const developerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, default: '' },
  qualification: { type: String, required: true },
  specialization: { type: String, required: true },
  projectsHandled: { type: Number, default: 0 },
  bio: { type: String, default: '' },
  order: { type: Number, default: 0 },
  portfolioUrl: { type: String, default: '' },
  email: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model('Developer', developerSchema);
