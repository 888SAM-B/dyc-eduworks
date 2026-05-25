import express from 'express';
import Service from '../models/Service.js';
import authMiddleware from '../middleware/authMiddleware.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: (req, file, cb) => {
    const uniqueName = `service_${Date.now()}${path.extname(file.originalname)}`;
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

// GET all active services (public)
router.get('/', async (req, res) => {
  try {
    const services = await Service.find({ active: true }).sort({ order: 1, createdAt: 1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET all services including inactive (admin)
router.get('/all', authMiddleware, async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1, createdAt: 1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single service with populated developers (public)
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate(
      'assignedDevelopers',
      'name image qualification specialization projectsHandled portfolioUrl email bio'
    );
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create service (admin only)
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    let { title, description, longDescription, icon, order, active, projects, assignedDevelopers } = req.body;
    
    if (typeof projects === 'string') {
      try { projects = JSON.parse(projects); } catch (e) { projects = []; }
    }
    if (typeof assignedDevelopers === 'string') {
      try { assignedDevelopers = JSON.parse(assignedDevelopers); } catch (e) { assignedDevelopers = []; }
    }

    const image = req.file ? `/uploads/${req.file.filename}` : '';
    
    const service = new Service({
      title,
      description,
      longDescription,
      icon,
      order: Number(order) || 0,
      active: active === 'true' || active === true,
      projects,
      assignedDevelopers,
      image,
    });
    
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update service (admin only)
router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    let { title, description, longDescription, icon, order, active, projects, assignedDevelopers } = req.body;
    
    if (typeof projects === 'string') {
      try { projects = JSON.parse(projects); } catch (e) { projects = []; }
    }
    if (typeof assignedDevelopers === 'string') {
      try { assignedDevelopers = JSON.parse(assignedDevelopers); } catch (e) { assignedDevelopers = []; }
    }

    const updateData = {
      title,
      description,
      longDescription,
      icon,
      order: Number(order) || 0,
      active: active === 'true' || active === true,
      projects,
      assignedDevelopers,
    };
    
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const service = await Service.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE service (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json({ message: 'Service deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
