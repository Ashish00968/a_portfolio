import React, { useState } from 'react';
import { Play, X } from 'lucide-react';
import './Portfolio.css';

const portfolioData = [
  {
    id: 1,
    title: 'Sethan Sunset',
    category: 'cinematic colour grading',
    desc: 'cinematic pacing , smooth flow and coulour grading from plain text to other',
    youtubeId: '7SS_xdbI3Xc', // Sethan Sunset
    imgSrc: '/sethan-thumbnail.png',
    colorClass: 'text-neon-blue border-neon-blue'
  },
  {
    id: 2,
    title: 'Patalsu Peak Hike',
    category: 'Travel Cinematic',
    desc: 'An immersive cinematic edit showcasing the breathtaking ascent of Patalsu Peak near Manali.',
    youtubeId: 'yinFLtDCJ3k', // Patalsu Hike
    imgSrc: '/patalsu-thumbnail.jpg',
    colorClass: 'text-neon-orange border-neon-orange'
  },
  {
    id: 3,
    title: 'Manali Transitions',
    category: 'Travel Reel',
    desc: 'Fast-paced, seamless transition reel highlighting the beauty and energy of Manali.',
    youtubeId: 'Q53KC68VNaM', // Manali
    imgSrc: '/manali-transitions-thumbnail.jpg',
    colorClass: 'text-neon-blue border-neon-blue'
  },
  {
    id: 4,
    title: 'Kalpa Cinematic',
    category: 'Slow Motion B-Roll',
    desc: 'A moody, slow-paced cinematic sequence capturing the raw essence and landscape of Kalpa.',
    youtubeId: '_FOL-z3aICs', // Kalpa
    imgSrc: '/kalpa-thumbnail.jpg',
    colorClass: 'text-neon-orange border-neon-orange'
  }
];

const PortfolioItem = ({ item, openModal }) => {
  return (
    <div 
      className="portfolio-item-horizontal"
      onClick={() => openModal(item.youtubeId)}
    >
      <img 
        src={item.imgSrc} 
        alt={item.title} 
        className="portfolio-thumb-horizontal" 
      />
      
      <div className="portfolio-content-horizontal">
        <div className={`badge-cat mb-sm ${item.colorClass}`}>{item.category}</div>
        <h3 className="portfolio-title">{item.title}</h3>
        <p className="portfolio-desc">{item.desc}</p>
        <div className="play-icon-overlay"><Play size={24} /></div>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);

  // Close modal on Escape key
  React.useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setActiveVideoUrl(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <section id="portfolio" className="portfolio section-padding">
      <div className="container margin-bottom">
        <div className="section-heading text-center">
          <h2 className="section-title">Project <span className="text-neon-orange text-glow">Showcase</span></h2>
          <p className="section-subtitle">Swipe or scroll to explore. Click to watch the cinematic edit.</p>
        </div>
      </div>
      
      {/* Horizontal Scroll Container */}
      <div className="portfolio-carousel-wrapper">
        <div className="portfolio-scroller">
          {portfolioData.map((item) => (
            <PortfolioItem key={item.id} item={item} openModal={setActiveVideoUrl} />
          ))}
        </div>
      </div>

      {/* Cinematic YouTube Modal Video Player */}
      {activeVideoUrl && (
        <div className="video-modal active" onClick={() => setActiveVideoUrl(null)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setActiveVideoUrl(null)}>
              <X size={32} />
            </button>
            <div className="iframe-container">
              <iframe 
                src={`https://www.youtube.com/embed/${activeVideoUrl}?autoplay=1&rel=0`} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
