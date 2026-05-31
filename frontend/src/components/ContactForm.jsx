import React, { useState } from 'react';
import { Mail, Globe, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { sendContactMessage } from '../api/index.js';

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', text: '' });

    try {
      const response = await sendContactMessage(form);
      if (response.data.success) {
        setStatus({ type: 'success', text: 'Thank you! Your message has been sent successfully.' });
        setForm({ name: '', email: '', message: '' });
      } else {
        throw new Error(response.data.message || 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      setStatus({
        type: 'error',
        text: err.response?.data?.message || 'Failed to send message. Please ensure Brevo is configured.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-medium/10 border-t border-light/5 relative overflow-hidden">
      {/* Decorative dynamic glows */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-teal/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-teal/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 items-start">

          {/* Left Column: Direct info & CTA statement */}
          <div className="lg:col-span-5" data-aos="fade-right">
            <p className="text-sm font-bold text-teal tracking-[0.3em] uppercase mb-4">Let's Connect</p>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">
              Ready to start your <br /><span className="text-teal">next big project?</span>
            </h2>
            <p className="text-light/60 text-lg mb-8 leading-relaxed">
              Whether you are a student looking for guidance, a startup seeking dynamic software systems, or a business looking for digital transformation, we are ready to assist.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 bg-medium/40 p-4 border border-light/5 rounded-sm hover:border-teal/20 transition-all duration-300">
                <div className="w-12 h-12 bg-teal/10 flex items-center justify-center rounded-sm text-teal shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-light/40 uppercase tracking-widest">Email Us</h4>
                  <a href="mailto:dyceduworks@gmail.com" className="text-light hover:text-teal font-medium transition-colors">
                    dyceduworks@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-medium/40 p-4 border border-light/5 rounded-sm hover:border-teal/20 transition-all duration-300">
                <div className="w-12 h-12 bg-teal/10 flex items-center justify-center rounded-sm text-teal shrink-0">
                  <Globe size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-light/40 uppercase tracking-widest">Website</h4>
                  <a href="https://dyceduworks.netlify.app" target="_blank" rel="noreferrer" className="text-light hover:text-teal font-medium transition-colors">
                    dyceduworks.netlify.app
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Contact Form */}
          <div className="lg:col-span-7" data-aos="fade-left">
            <div className="bg-medium border border-light/10 p-8 md:p-10 relative">
              <h3 className="text-2xl font-bold mb-2">Let's Talk</h3>
              <p className="text-light/40 text-sm mb-8">Fill out the form below and we will get back to you shortly.</p>

              {status.text && (
                <div className={`flex items-start gap-3 p-4 mb-6 text-sm border ${status.type === 'success'
                    ? 'bg-teal/5 border-teal/30 text-teal'
                    : 'bg-red-500/5 border-red-500/30 text-red-400'
                  }`}>
                  {status.type === 'success' ? (
                    <CheckCircle size={18} className="shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  )}
                  <p>{status.text}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold tracking-widest text-light/50 uppercase mb-2">Full Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    disabled={loading}
                    placeholder="Enter your name"
                    className="w-full bg-dark border border-light/10 px-4 py-3 text-light placeholder-light/20 focus:border-teal focus:outline-none transition-colors disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold tracking-widest text-light/50 uppercase mb-2">Email Address</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    disabled={loading}
                    placeholder="Enter your email address"
                    className="w-full bg-dark border border-light/10 px-4 py-3 text-light placeholder-light/20 focus:border-teal focus:outline-none transition-colors disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold tracking-widest text-light/50 uppercase mb-2">How can we help?</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    disabled={loading}
                    rows={4}
                    placeholder="Describe your project, question or guidance requirement..."
                    className="w-full bg-dark border border-light/10 px-4 py-3 text-light placeholder-light/20 focus:border-teal focus:outline-none transition-colors resize-none disabled:opacity-50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-teal text-dark py-4 font-black uppercase tracking-tight hover:bg-light transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-dark border-t-transparent rounded-full animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactForm;
