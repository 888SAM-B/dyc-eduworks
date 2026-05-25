import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import Developer from '../models/Developer.js';
import authMiddleware from '../middleware/authMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: (req, file, cb) => {
    const uniqueName = `dev_${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) return cb(null, true);
    cb(new Error('Only image files allowed'));
  },
});

const router = express.Router();

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
    const image = req.file ? `/uploads/${req.file.filename}` : '';
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
    if (req.file) updateData.image = `/uploads/${req.file.filename}`;

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
