import express from 'express';
import Developer from '../models/Developer.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { createUpload } from '../config/cloudinary.js';

const router = express.Router();
const upload = createUpload('developers');

// GET all developers (public)
router.get('/', async (req, res) => {
  try {
    const developers = await Developer.find().sort({ order: 1, createdAt: 1 });
    res.json(developers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create developer (admin only)
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { name, qualification, specialization, projectsHandled, bio, order, portfolioUrl, email } = req.body;
    // Cloudinary returns the full URL in req.file.path
    const image = req.file ? req.file.path : '';
    const developer = new Developer({ name, qualification, specialization, projectsHandled, bio, order, image, portfolioUrl, email });
    await developer.save();
    res.status(201).json(developer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update developer (admin only)
router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { name, qualification, specialization, projectsHandled, bio, order, portfolioUrl, email } = req.body;
    const updateData = { name, qualification, specialization, projectsHandled, bio, order, portfolioUrl, email };
    // Only update image if a new one was uploaded
    if (req.file) updateData.image = req.file.path;

    const developer = await Developer.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!developer) return res.status(404).json({ message: 'Developer not found' });
    res.json(developer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE developer (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const developer = await Developer.findByIdAndDelete(req.params.id);
    if (!developer) return res.status(404).json({ message: 'Developer not found' });
    res.json({ message: 'Developer deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
