import React, { useEffect, useState } from 'react';
import { getDevelopers, getServices } from '../../api/index.js';
import { Users, Settings, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const StatCard = ({ label, count, icon: Icon, to }) => (
  <Link to={to} className="bg-medium border border-light/5 hover:border-teal/40 p-8 group transition-all duration-300 block">
    <div className="flex items-start justify-between mb-6">
      <div className="w-12 h-12 bg-teal/10 flex items-center justify-center group-hover:bg-teal transition-colors duration-300">
        <Icon className="text-teal group-hover:text-dark transition-colors duration-300" size={22} />
      </div>
      <ArrowRight className="text-light/20 group-hover:text-teal group-hover:translate-x-1 transition-all duration-300" size={18} />
    </div>
    <div className="text-5xl font-black text-light mb-2">{count}</div>
    <div className="text-xs text-light/40 uppercase tracking-widest">{label}</div>
  </Link>
);

const DashboardPage = () => {
  const [stats, setStats] = useState({ developers: 0, services: 0 });

  useEffect(() => {
    Promise.all([getDevelopers(), getServices()]).then(([devRes, svcRes]) => {
      setStats({ developers: devRes.data.length, services: svcRes.data.length });
    }).catch(() => {});
  }, []);

  return (
    <div className="p-8">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold mb-2">Dashboard</h1>
        <p className="text-light/40 text-sm">Welcome back. Manage your site content from here.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <StatCard label="Developers" count={stats.developers} icon={Users} to="/admin/developers" />
        <StatCard label="Services" count={stats.services} icon={Settings} to="/admin/services" />
      </div>

      <div className="bg-medium border border-light/5 p-8">
        <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link to="/admin/developers" className="bg-teal/10 text-teal border border-teal/20 px-6 py-3 text-sm font-bold hover:bg-teal hover:text-dark transition-all duration-300">
            + Add Developer
          </Link>
          <Link to="/admin/services" className="bg-teal/10 text-teal border border-teal/20 px-6 py-3 text-sm font-bold hover:bg-teal hover:text-dark transition-all duration-300">
            + Add Service
          </Link>
          <a href="/" target="_blank" rel="noreferrer" className="border border-light/10 text-light/50 px-6 py-3 text-sm font-bold hover:border-light/30 hover:text-light transition-all duration-300">
            View Live Site ↗
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
