import React from 'react';
import { Mail, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer id="contact" className="bg-medium py-16 px-6 border-t border-light/5">
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
      <div className="col-span-2">
        <div className="text-2xl font-black tracking-tighter mb-6">
          <span className="text-teal">DYC</span><span className="text-light"> EDUWORKS</span>
        </div>
        <p className="text-light/50 max-w-sm mb-8">
          Elevating digital experiences through expert engineering and innovative education solutions.
        </p>

      </div>

      <div>
        <h4 className="text-light font-bold mb-6 tracking-widest uppercase text-sm">Services</h4>
        <ul className="space-y-4 text-light/50 text-sm">
          <li><a href="#services" className="hover:text-teal transition-colors">AI Solutions</a></li>
          <li><a href="#services" className="hover:text-teal transition-colors">Web Development</a></li>
          <li><a href="#services" className="hover:text-teal transition-colors">Management Systems</a></li>
          <li><a href="#services" className="hover:text-teal transition-colors">Academic Guidance</a></li>
        </ul>
      </div>

      <div>
        <h4 className="text-light font-bold mb-6 tracking-widest uppercase text-sm">Contact</h4>
        <ul className="space-y-4 text-light/50 text-sm">
          <li className="flex items-center gap-2"><Mail size={15} className="text-teal shrink-0" /> dyceduworks@gmail.com</li>
          <li className="flex items-center gap-2"><Globe size={15} className="text-teal shrink-0" /> dyceduworks.netlify.app</li>
        </ul>
        <div className="mt-8">
          <Link to="/admin" className="text-xs text-light/20 hover:text-teal transition-colors tracking-widest uppercase">
            Admin Panel →
          </Link>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-light/5 text-center text-light/25 text-xs tracking-widest uppercase">
      © {new Date().getFullYear()} DYC EDUWORKS. All Rights Reserved.
    </div>
  </footer>
);

export default Footer;
