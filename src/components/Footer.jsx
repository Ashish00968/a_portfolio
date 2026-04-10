import React from 'react';
import { Zap, Mail } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import './Footer.css';

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
              <i className="fab fa-instagram"></i> @ashish_0968
            </a>
            <a href="https://fiverr.com/YOUR_PROFILE" target="_blank" rel="noreferrer" className="btn btn-outline btn-lg border-neon-orange">
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
            <a href="mailto:ashishnirankari0001@gmail.com" className="social-icon"><i className="fas fa-envelope"></i></a>
            <a href="https://instagram.com/ashish_0968" target="_blank" rel="noreferrer" className="social-icon"><i className="fab fa-instagram"></i></a>
            <a href="https://youtube.com/" target="_blank" rel="noreferrer" className="social-icon"><i className="fab fa-youtube"></i></a>
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
