import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  longDescription: { type: String, default: '' },
  icon: { type: String, default: 'Globe' },
  image: { type: String, default: '' },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  projects: [
    {
      title: { type: String, required: true },
      description: { type: String, default: '' },
      url: { type: String, default: '' },
    },
  ],
  assignedDevelopers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Developer' }],
}, { timestamps: true });

export default mongoose.model('Service', serviceSchema);
