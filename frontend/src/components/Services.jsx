import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getServices } from '../api/index.js';
import { ChevronRight, BookOpen, Cpu, Settings, ShoppingBag, Globe, User, Layers } from 'lucide-react';

const iconMap = { BookOpen, Cpu, Settings, ShoppingBag, Globe, User, Layers };

const ServiceCard = ({ _id, icon, title, description, index }) => {
  const Icon = iconMap[icon] || Globe;
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 80}
      className="bg-medium p-8 border border-light/5 hover:border-teal/50 transition-all duration-500 group flex flex-col"
    >
      <div className="w-12 h-12 bg-teal/10 flex items-center justify-center mb-6 group-hover:bg-teal transition-colors duration-500">
        <Icon className="text-teal group-hover:text-dark transition-colors duration-500" size={24} />
      </div>
      <h3 className="text-xl font-bold mb-4 group-hover:text-teal transition-colors duration-500">{title}</h3>
      <p className="text-light/60 text-sm leading-relaxed mb-6 flex-1">{description}</p>
      <Link
        to={`/services/${_id}`}
        className="inline-flex items-center text-xs font-bold tracking-widest text-teal hover:text-light transition-colors"
      >
        LEARN MORE <ChevronRight size={14} className="ml-1" />
      </Link>
    </div>
  );
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices()
      .then(({ data }) => setServices(data))
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="services" className="py-24 px-6 bg-dark">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16" data-aos="fade-up">
          <h2 className="text-sm font-bold text-teal tracking-[0.3em] uppercase mb-4">What We Do</h2>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h3 className="text-4xl md:text-5xl font-extrabold max-w-xl">
              Professional Solutions for Tomorrow's Challenges
            </h3>
            <p className="text-light/60 max-w-md">
              We specialize in delivering high-performance digital products that drive innovation and academic success.
            </p>
          </div>
        </div>
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <div key={i} className="bg-medium/50 p-8 border border-light/5 animate-pulse h-52" />)}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={service._id} {...service} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
