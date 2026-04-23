import React from 'react';
import { Zap, Mail } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import './Footer.css';

// Lightweight inline SVG brand icons (lucide-react doesn't include brand icons)
const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="5"/>
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
  </svg>
);

const YoutubeIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504A3.015 3.015 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.504 9.376.504 9.376.504s7.505 0 9.377-.504a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const Footer = () => {
  const year = new Date().getFullYear();
  const sectionRef = useScrollReveal();

  return (
    <>
      {/* Contact CTA */}
      <section id="contact" className="contact section-padding bg-glow-gradient" ref={sectionRef}>
        <div className="container text-center">
          <h2 className="section-title text-huge reveal">Let's craft your next <span className="text-neon-blue text-glow">Masterpiece.</span></h2>
          <p className="section-subtitle lg reveal" data-delay="1">Ready to elevate your content? Get in touch today and let's create something amazing together.</p>
          
          <div className="contact-links reveal" data-delay="2">
            <a href="mailto:ashishnirankari0001@gmail.com" className="btn btn-primary btn-glow btn-lg">
              <Mail size={20} /> Email Me
            </a>
            <a href="https://instagram.com/ashish_0968" target="_blank" rel="noreferrer" className="btn btn-outline btn-lg">
              <InstagramIcon size={20} /> @ashish_0968
            </a>
            <a href="https://www.fiverr.com/s/38rRj" target="_blank" rel="noreferrer" className="btn btn-outline btn-lg border-neon-orange">
              <Zap size={20} className="text-neon-orange" /> Fiverr Profile
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <a href="#" className="logo text-neon-blue text-glow">A<span className="text-neon-orange">.</span>N<span className="text-neon-orange">.</span></a>
            <p className="text-gray mt-sm">Cinematic Editor for high-converting content.</p>
          </div>
          <div className="footer-socials">
            <a href="mailto:ashishnirankari0001@gmail.com" className="social-icon"><Mail size={18} /></a>
            <a href="https://instagram.com/ashish_0968" target="_blank" rel="noreferrer" className="social-icon"><InstagramIcon size={18} /></a>
            <a href="https://youtube.com/" target="_blank" rel="noreferrer" className="social-icon"><YoutubeIcon size={18} /></a>
          </div>
          <div className="footer-copyright">
            <p>&copy; {year} Ashish Nirankari. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
