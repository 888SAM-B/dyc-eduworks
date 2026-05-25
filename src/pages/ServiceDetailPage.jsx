import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, FolderOpen, Users, ChevronRight, Mail } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const BACKEND_URL = 'http://localhost:5001';

const getAbsoluteUrl = (url) => {
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url}`;
};

const ServiceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: 'ease-out-cubic' });
    fetch(`${BACKEND_URL}/api/services/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.message) throw new Error(data.message);
        setService(data);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-dark flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-teal border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (error || !service) return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center gap-4">
      <p className="text-light/40">Service not found.</p>
      <button onClick={() => navigate('/')} className="text-teal text-sm hover:underline flex items-center gap-1">
        <ArrowLeft size={14} /> Back to Home
      </button>
    </div>
  );

  return (
    <div className="bg-dark text-light min-h-screen">
      <Navbar />

      {/* Hero Banner */}
      <section className="pt-32 pb-20 px-6 border-b border-light/5">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/#services')}
            className="flex items-center gap-2 text-light/40 hover:text-teal transition-colors text-sm mb-10 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Services
          </button>

          <div data-aos="fade-up" className="max-w-4xl">
            <p className="text-teal text-sm font-bold tracking-[0.3em] uppercase mb-4">Our Service</p>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6">{service.title}</h1>
            <p className="text-light/60 text-xl max-w-2xl leading-relaxed">{service.description}</p>
          </div>
        </div>
      </section>

      {/* Long Description + Illustration */}
      {(service.longDescription || service.image) && (
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-5 gap-16 items-center">

              {/* Left — Illustration (2/5 width, vertical portrait) */}
              <div data-aos="fade-right" className="md:col-span-2 relative">
                {service.image ? (
                  <div className="relative overflow-hidden rounded-sm">
                    {/* Decorative corner accents */}
                    <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-teal z-10 pointer-events-none" />
                    <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-teal z-10 pointer-events-none" />
                    <img
                      src={`${BACKEND_URL}${service.image}`}
                      alt={`${service.title} illustration`}
                      className="w-full object-cover object-center"
                      style={{ aspectRatio: '3 / 4' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-dark/30 to-transparent pointer-events-none" />
                  </div>
                ) : (
                  /* Decorative fallback when no image — vertical portrait */
                  <div className="relative border border-teal/20 flex items-center justify-center overflow-hidden bg-medium/30" style={{ aspectRatio: '3 / 4' }}>
                    <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-teal" />
                    <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-teal" />
                    <div className="text-center px-6">
                      <div className="text-9xl font-black text-teal/5 leading-none select-none">{service.title?.charAt(0)}</div>
                      <div className="text-teal/20 text-xs tracking-widest uppercase mt-6">{service.title}</div>
                    </div>
                    {/* Abstract grid pattern */}
                    <div className="absolute inset-0 opacity-5"
                      style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, #00ADB5 40px, #00ADB5 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #00ADB5 40px, #00ADB5 41px)' }}
                    />
                  </div>
                )}
              </div>

              {/* Right — Overview text (3/5 width — slightly wider) */}
              <div data-aos="fade-left" className="md:col-span-3 flex flex-col justify-center">
                <h2 className="text-sm font-bold text-teal tracking-[0.3em] uppercase mb-4">Overview</h2>
                <h3 className="text-3xl md:text-4xl font-extrabold mb-6">What We Offer</h3>
                <p className="text-light/70 leading-relaxed text-lg whitespace-pre-line">{service.longDescription}</p>
              </div>

            </div>
          </div>
        </section>
      )}



      {/* Sample Projects */}
      {service.projects && service.projects.length > 0 && (
        <section className="py-20 px-6 bg-medium/20">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12" data-aos="fade-up">
              <h2 className="text-sm font-bold text-teal tracking-[0.3em] uppercase mb-4">
                <FolderOpen size={14} className="inline mr-2" />Sample Projects
              </h2>
              <h3 className="text-3xl font-extrabold">Work We've Delivered</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.projects.map((project, i) => {
                const CardWrapper = project.url
                  ? ({ children }) => (
                      <a href={getAbsoluteUrl(project.url)} target="_blank" rel="noreferrer" className="block">
                        {children}
                      </a>
                    )
                  : ({ children }) => <div>{children}</div>;

                return (
                  <CardWrapper key={i}>
                    <div
                      data-aos="fade-up"
                      data-aos-delay={i * 80}
                      className={`border border-light/10 p-6 transition-all duration-300 group h-full flex flex-col ${project.url ? 'hover:border-teal/60 cursor-pointer' : 'hover:border-teal/40'}`}
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-8 h-8 bg-teal/10 flex items-center justify-center shrink-0 group-hover:bg-teal transition-colors duration-300">
                          <ChevronRight size={16} className="text-teal group-hover:text-dark transition-colors duration-300" />
                        </div>
                        <h4 className="font-bold text-base group-hover:text-teal transition-colors duration-300">{project.title}</h4>
                      </div>
                      <p className="text-light/50 text-sm leading-relaxed flex-1">{project.description}</p>
                      {project.url && (
                        <div className="mt-4 pt-4 border-t border-light/10 flex items-center gap-2 text-teal text-xs font-bold group-hover:gap-3 transition-all duration-300">
                          <ExternalLink size={13} />
                          <span>View Project</span>
                        </div>
                      )}
                    </div>
                  </CardWrapper>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Assigned Developers */}
      {service.assignedDevelopers && service.assignedDevelopers.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12" data-aos="fade-up">
              <h2 className="text-sm font-bold text-teal tracking-[0.3em] uppercase mb-4">
                <Users size={14} className="inline mr-2" />Who Handles This
              </h2>
              <h3 className="text-3xl font-extrabold">Developers for This Service</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.assignedDevelopers.map((dev, i) => (
                <div
                  key={dev._id}
                  data-aos="fade-up"
                  data-aos-delay={i * 80}
                  className="bg-medium border border-light/5 hover:border-teal/30 transition-all duration-300 group p-6 flex flex-col items-center text-center relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal/20 via-teal to-teal/20" />

                  {/* Circular Avatar */}
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-dark group-hover:border-teal transition-all duration-500 bg-dark/60 shadow-lg mb-4 mt-2 shrink-0">
                    {dev.image ? (
                      <img src={`${BACKEND_URL}${dev.image}`} alt={dev.name} className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-3xl font-black text-teal/30">
                          {dev.name.charAt(0)}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col items-center w-full">
                    <h4 className="font-bold text-base mb-1 group-hover:text-teal transition-colors">{dev.name}</h4>
                    <p className="text-teal text-xs font-bold tracking-widest uppercase mb-3">{dev.specialization}</p>
                    <p className="text-light/40 text-xs mb-2">{dev.qualification}</p>
                    {dev.email && (
                      <a href={`mailto:${dev.email}`} className="text-light/40 hover:text-teal text-xs transition-colors duration-300 flex items-center justify-center gap-1.5 mb-4">
                        <Mail size={13} className="text-teal" /> {dev.email}
                      </a>
                    )}
                    {dev.portfolioUrl && (
                      <a
                        href={getAbsoluteUrl(dev.portfolioUrl)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-teal hover:text-light transition-colors mt-auto"
                      >
                        Portfolio <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 px-6 bg-medium/20 border-t border-light/5">
        <div className="max-w-3xl mx-auto text-center" data-aos="zoom-in">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
            Interested in <span className="text-teal">{service.title}?</span>
          </h2>
          <p className="text-light/50 mb-8">Let's discuss your project and see how we can help.</p>
          <a href="/#contact" className="inline-block bg-teal text-dark px-10 py-4 font-black hover:bg-light transition-all duration-300 uppercase tracking-tight">
            Contact Us
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDetailPage;
