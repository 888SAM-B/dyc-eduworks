import React, { useState, useEffect } from 'react';
import { ExternalLink, Mail } from 'lucide-react';
import { getDevelopers } from '../api/index.js';

const BACKEND_URL = 'http://localhost:5001';

const getAbsoluteUrl = (url) => {
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url}`;
};

const DeveloperCard = ({ name, image, qualification, specialization, projectsHandled, bio, portfolioUrl, email, index }) => (
  <div
    data-aos="fade-up"
    data-aos-delay={index * 100}
    className="bg-medium border border-light/5 hover:border-teal/40 transition-all duration-500 group p-6 flex flex-col items-center text-center relative overflow-hidden"
  >
    {/* Subtle top decoration */}
    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-teal/20 via-teal to-teal/20" />

    {/* Circular profile image (DP style) */}
    <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-dark group-hover:border-teal transition-all duration-500 bg-dark/60 shadow-xl mb-6 mt-4 shrink-0">
      {image ? (
        <img
          src={`${BACKEND_URL}${image}`}
          alt={name}
          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-4xl font-black text-teal/30">
            {name.charAt(0)}
          </div>
        </div>
      )}
    </div>

    {/* Content */}
    <div className="flex-1 flex flex-col items-center w-full">
      <h3 className="text-xl font-bold mb-1 group-hover:text-teal transition-colors duration-300">{name}</h3>
      <p className="text-teal text-xs font-bold tracking-widest uppercase mb-3">{specialization}</p>
      <p className="text-light/50 text-xs mb-2">{qualification}</p>
      {email && (
        <a href={`mailto:${email}`} className="text-light/40 hover:text-teal text-xs transition-colors duration-300 flex items-center justify-center gap-1.5 mb-4">
          <Mail size={13} className="text-teal" /> {email}
        </a>
      )}
      {bio && <p className="text-light/60 text-sm leading-relaxed mb-6 max-w-xs">{bio}</p>}
    </div>

    {/* Bottom stats and action */}
    <div className="w-full pt-5 border-t border-light/10 flex items-center justify-between gap-4">
      <div className="text-left">
        <span className="text-xs text-light/30 uppercase tracking-widest block">Projects</span>
        <span className="text-2xl font-black text-teal">{projectsHandled}</span>
      </div>
      {portfolioUrl && (
        <a
          href={getAbsoluteUrl(portfolioUrl)}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-xs font-bold border border-teal/30 text-teal px-4 py-2 hover:bg-teal hover:text-dark hover:border-teal transition-all duration-300 rounded-sm"
        >
          Portfolio <ExternalLink size={12} />
        </a>
      )}
    </div>
  </div>
);

const Developers = () => {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDevelopers()
      .then(({ data }) => setDevelopers(data))
      .catch(() => setDevelopers([]))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && developers.length === 0) return null;

  return (
    <section id="team" className="py-24 px-6 bg-dark">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16" data-aos="fade-up">
          <h2 className="text-sm font-bold text-teal tracking-[0.3em] uppercase mb-4">Our Team</h2>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h3 className="text-4xl md:text-5xl font-extrabold max-w-xl">
              The People Behind the Work
            </h3>
            <p className="text-light/60 max-w-md">
              A team of dedicated developers and mentors committed to technical excellence and professional growth.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => <div key={i} className="bg-medium/50 border border-light/5 animate-pulse h-80" />)}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {developers.map((dev, index) => (
              <DeveloperCard key={dev._id} {...dev} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Developers;
