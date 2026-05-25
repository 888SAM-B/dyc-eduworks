import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-dark/90 backdrop-blur-md border-b border-light/10">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 select-none">
          <img src="/logo.png" alt="DYC EDUWORKS" className="h-10 w-10 object-contain" />
          <span className="text-xl font-black tracking-tighter">
            <span className="text-teal">DYC</span><span className="text-light"> EDUWORKS</span>
          </span>
        </Link>

        {!isAdmin && (
          <div className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-widest text-light/60">
            <a href="/#home" className="hover:text-teal transition-colors">Home</a>
            <a href="/#services" className="hover:text-teal transition-colors">Services</a>
            <a href="/#team" className="hover:text-teal transition-colors">Team</a>
            <a href="/#about" className="hover:text-teal transition-colors">About</a>
            <a href="/#contact" className="hover:text-teal transition-colors">Contact</a>
          </div>
        )}

        {!isAdmin && (
          <a
            href="/#contact"
            className="bg-teal text-dark px-6 py-2 font-bold text-sm hover:bg-light transition-all duration-300 flex items-center group"
          >
            LET'S TALK <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
