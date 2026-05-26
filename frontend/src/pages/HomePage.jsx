import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import Services from '../components/Services.jsx';
import Developers from '../components/Developers.jsx';
import ContactForm from '../components/ContactForm.jsx';
import Footer from '../components/Footer.jsx';

const HomePage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: 'ease-out-cubic' });
  }, []);

  return (
    <div className="bg-dark text-light min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Developers />

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-medium/20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div data-aos="fade-right">
            <div className="relative p-12 border border-teal/20">
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-teal/5 -z-10" />
              <h2 className="text-sm font-bold text-teal tracking-[0.3em] uppercase mb-4">Our Mission</h2>
              <h3 className="text-4xl font-extrabold mb-6">Bridging Academia and Industry</h3>
              <p className="text-light/60 mb-6 leading-relaxed">
                DYC EDUWORKS was founded with a single goal: to empower students and businesses with high-quality technical solutions. We don't just build software; we build foundations for success.
              </p>
              <ul className="space-y-4">
                {['Expert Mentorship', 'Modern Tech Stacks', 'Scalable Architecture', 'Professional Design'].map((item, i) => (
                  <li key={i} className="flex items-center text-sm font-medium">
                    <div className="w-1.5 h-1.5 bg-teal mr-3 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div data-aos="fade-left">
            <h2 className="text-8xl font-black text-light/5 leading-none mb-4">ABOUT</h2>
            <p className="text-xl text-light/80 border-l-4 border-teal pl-6 py-2 mb-6">
              We are a team of dedicated developers and mentors committed to technical excellence and professional growth.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-8">
              {[
                { num: '50+', label: 'Projects Delivered' },
                { num: '100%', label: 'Client Satisfaction' },
                { num: '6+', label: 'Services Offered' },
                { num: '3+', label: 'Years Experience' },
              ].map((stat, i) => (
                <div key={i} className="border border-light/10 p-5">
                  <div className="text-3xl font-black text-teal mb-1">{stat.num}</div>
                  <div className="text-xs text-light/40 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactForm />

      <Footer />
    </div>
  );
};

export default HomePage;
