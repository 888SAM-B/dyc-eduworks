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
        <div className="flex space-x-4">
          {/* Twitter */}
          <a href="#" className="w-10 h-10 border border-light/10 flex items-center justify-center hover:border-teal hover:text-teal transition-all">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
          </a>
          {/* LinkedIn */}
          <a href="#" className="w-10 h-10 border border-light/10 flex items-center justify-center hover:border-teal hover:text-teal transition-all">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
          </a>
          {/* GitHub */}
          <a href="#" className="w-10 h-10 border border-light/10 flex items-center justify-center hover:border-teal hover:text-teal transition-all">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
          </a>
        </div>
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
          <li className="flex items-center gap-2"><Globe size={15} className="text-teal shrink-0" /> www.dyceduworks.com</li>
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
