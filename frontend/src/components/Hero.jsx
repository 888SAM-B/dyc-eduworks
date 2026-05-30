import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

const Typewriter = ({ words, typingSpeed = 100, deletingSpeed = 60, delay = 2000 }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const fullWord = words[currentWordIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setCurrentText((prev) => fullWord.slice(0, prev.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && currentText === fullWord) {
      timer = setTimeout(() => setIsDeleting(true), delay);
    }

    if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, delay]);

  return (
    <span className="inline-flex items-center">
      <span>{currentText}</span>
      <span className="w-[3px] h-[0.9em] bg-teal ml-1 animate-pulse" style={{ display: 'inline-block', verticalAlign: 'middle' }}></span>
    </span>
  );
};

const Hero = () => (
  <section id="home" className="pt-32 pb-16 md:py-0 min-h-[70vh] md:min-h-screen flex items-center justify-center px-6">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full">
      <div data-aos="fade-right" data-aos-duration="1000">
        <p className="text-sm font-bold text-teal tracking-[0.3em] uppercase mb-6 min-h-[24px] flex items-center">
          <Typewriter words={["Technology", "Education", "Growth"]} />
        </p>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
          Empowering <br />
          <span className="text-teal">Digital Future</span> <br />
          with Precision.
        </h1>
        <p className="text-light/60 text-lg mb-8 max-w-lg">
          DYC EDUWORKS provides cutting-edge technology solutions and academic guidance to bridge the gap between learning and industry excellence.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="#services" className="bg-teal text-dark px-8 py-4 font-bold hover:bg-light transition-all duration-300 flex items-center group">
            EXPLORE SERVICES <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#team" className="border border-light/20 text-light px-8 py-4 font-bold hover:border-teal hover:text-teal transition-all duration-300">
            MEET THE TEAM
          </a>
        </div>
      </div>

      <div className="hidden md:block relative" data-aos="fade-left" data-aos-duration="1000">
        <div className="w-full h-[400px] md:h-[500px] border border-teal/20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-teal/5 group-hover:bg-teal/10 transition-colors duration-500" />
          <div className="absolute top-10 right-10 w-32 h-32 border border-teal/20" />
          <div className="absolute bottom-20 left-10 w-48 h-48 border border-light/5" />
          <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
            <div className="text-8xl font-black text-teal/10 select-none tracking-tighter">DYC</div>
            <div className="text-sm tracking-[0.5em] text-light/10 font-bold uppercase">EDUWORKS</div>
          </div>
        </div>
        <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-teal" />
        <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-teal" />
      </div>
    </div>
  </section>
);

export default Hero;
