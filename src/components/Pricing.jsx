import React from 'react';
import { Check, Flame, Zap } from 'lucide-react';
import './Pricing.css';

const Pricing = () => {
  return (
    <section id="services" className="services section-padding">
      <div className="container margin-bottom text-center">
        <h2 className="section-title">Editing <span className="text-neon-orange text-glow">Packages</span></h2>
        <p className="section-subtitle">Scalable editing tiers designed for varying content creation needs.</p>
      </div>
      
      <div className="container grid pricing-grid">
        {/* Package 1: Basic */}
        <div className="pricing-card">
          <h3 className="tier-name">Single Reel</h3>
          <div className="price">
            <span className="currency">$</span>19 <span style={{fontSize: '1.2rem', color: 'var(--text-muted)'}}>(₹1,599)</span><span className="period"> / reel</span>
          </div>
          <ul className="features">
            <li><Check size={18} className="text-neon-blue" /> Professional color grading</li>
            <li><Check size={18} className="text-neon-blue" /> High-retention pacing</li>
            <li><Check size={18} className="text-neon-blue" /> Dynamic text & captions</li>
            <li><Check size={18} className="text-neon-blue" /> Sound design & mixing</li>
            <li><Check size={18} className="text-neon-blue" /> 1 Revision</li>
          </ul>
          <a href="#contact" className="btn btn-outline btn-full mt-auto">Book Single Reel</a>
        </div>
        
        {/* Package 2: Standard (Popular) */}
        <div className="pricing-card popular neon-border">
          <div className="popular-tag text-neon-blue"><Flame size={14} style={{display:'inline-block', verticalAlign:'middle', marginRight:'4px'}}/> Batch Offer</div>
          <h3 className="tier-name">Reel Bundle</h3>
          <div className="price text-neon-blue">
            <span className="currency text-white">$</span>49 <span style={{fontSize: '1.2rem', color: 'var(--text-muted)'}}>(₹4,099)</span><span className="period text-gray"> / 3 reels</span>
          </div>
          <ul className="features">
            <li><Check size={18} className="text-neon-blue" /> 3 fully-edited cinematic reels</li>
            <li><Check size={18} className="text-neon-blue" /> Custom motion graphics</li>
            <li><Check size={18} className="text-neon-blue" /> Viral-style framing & hooks</li>
            <li><Check size={18} className="text-neon-blue" /> Cohesive feed styling</li>
            <li><Check size={18} className="text-neon-blue" /> 2 Revisions</li>
          </ul>
          <a href="#contact" className="btn btn-primary btn-glow btn-full mt-auto">Book Reel Bundle</a>
        </div>
        
        {/* Package 3: Premium */}
        <div className="pricing-card">
          <h3 className="tier-name">The Creator Pack</h3>
          <div className="price text-neon-orange">
            <span className="currency text-white">$</span>69 <span style={{fontSize: '1.2rem', color: 'var(--text-muted)'}}>(₹5,799)</span><span className="period text-gray"> / pack</span>
          </div>
          <ul className="features">
            <li><Check size={18} className="text-neon-orange" /> 1 Full YouTube Video</li>
            <li><Check size={18} className="text-neon-orange" /> 2 Engaging Youtube Shorts/Reels</li>
            <li><Check size={18} className="text-neon-orange" /> Advanced cinematic color grade</li>
            <li><Check size={18} className="text-neon-orange" /> Foley & immersive sound design</li>
            <li><Zap size={18} className="text-neon-orange" /> Priority fast-track delivery</li>
          </ul>
          <a href="#contact" className="btn btn-outline border-neon-orange btn-full mt-auto">Select Creator Pack</a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
