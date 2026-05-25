import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';
import Service from './models/Service.js';
import Developer from './models/Developer.js';

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Create admin
    const existingAdmin = await Admin.findOne();
    if (!existingAdmin) {
      await Admin.create({ username: 'admin', password: 'dyceduworks@2024' });
      console.log('✅ Admin created → username: admin | password: dyceduworks@2024');
    } else {
      console.log('ℹ️  Admin already exists, skipping.');
    }

    // Seed default services
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      await Service.insertMany([
        { title: 'Project Guidance', description: 'Comprehensive mentorship and technical support for student projects across various domains.', icon: 'BookOpen', order: 1 },
        { title: 'AI Powered Projects', description: 'Custom AI solutions utilizing machine learning, NLP, and computer vision for modern challenges.', icon: 'Cpu', order: 2 },
        { title: 'Full Stack Systems', description: 'Robust management systems built with scalable architectures and modern tech stacks.', icon: 'Settings', order: 3 },
        { title: 'E-commerce Platforms', description: 'Seamless shopping experiences with integrated payments and inventory management.', icon: 'ShoppingBag', order: 4 },
        { title: 'Static Web Pages', description: 'Lightning-fast, SEO-optimized static websites for businesses and personal brands.', icon: 'Globe', order: 5 },
        { title: 'Personal Portfolio', description: 'Stunning digital resumes that showcase your professional journey and achievements.', icon: 'User', order: 6 },
      ]);
      console.log('✅ Default services seeded');
    } else {
      console.log('ℹ️  Services already exist, skipping.');
    }

    // Seed sample developer
    await Developer.deleteMany({});
    await Developer.create({
      name: 'Sample Developer',
      qualification: 'B.Tech Computer Science',
      specialization: 'Full Stack Development',
      projectsHandled: 12,
      bio: 'Passionate developer with expertise in React, Node.js and MongoDB.',
      image: '/uploads/sample-deev.jpg',
      email: 'sample@dyceduworks.com',
      portfolioUrl: 'https://github.com',
      order: 1,
    });
    console.log('✅ Sample developer seeded');

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
};

seed();
