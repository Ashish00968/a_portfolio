import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  MapPin,
  Maximize2,
  X,
  Sliders,
  Play,
  ArrowUpRight,
  Camera,
  Film,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import SpotlightCard from '../components/ui/SpotlightCard';
import {
  photographyGallery,
  photoEditComparison,
  videoShowcase,
  profile,
} from '../data/portfolioData';
import './PhotoVideoPage.css';

const PhotoVideoPage = () => {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'photo' | 'video'
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  // Before/After comparison slider state
  const [sliderPos, setSliderPos] = useState(50);
  const [isSliding, setIsSliding] = useState(false);
  const sliderContainerRef = useRef(null);

  const selectedPhoto = selectedPhotoIndex !== null ? photographyGallery[selectedPhotoIndex] : null;

  // Lightbox Cycling Handlers
  const handlePrevPhoto = useCallback(() => {
    setSelectedPhotoIndex((prev) =>
      prev !== null ? (prev - 1 + photographyGallery.length) % photographyGallery.length : null
    );
  }, []);

  const handleNextPhoto = useCallback(() => {
    setSelectedPhotoIndex((prev) =>
      prev !== null ? (prev + 1) % photographyGallery.length : null
    );
  }, []);

  // Keyboard navigation for Lightbox and Video modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedPhotoIndex(null);
        setActiveVideo(null);
      } else if (selectedPhotoIndex !== null) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          handlePrevPhoto();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          handleNextPhoto();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, handlePrevPhoto, handleNextPhoto]);

  // Lock body scroll when any modal is open
  useEffect(() => {
    if (selectedPhotoIndex !== null || activeVideo !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedPhotoIndex, activeVideo]);

  // Handle Before/After slider dragging via pointer events for touch resilience
  const handleSliderMove = useCallback((clientX) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    let pos = ((clientX - rect.left) / rect.width) * 100;
    if (pos < 0) pos = 0;
    if (pos > 100) pos = 100;
    setSliderPos(pos);
  }, []);

  const handlePointerDown = (e) => {
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore if pointer capture unsupported
    }
    setIsSliding(true);
    handleSliderMove(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (!isSliding) return;
    handleSliderMove(e.clientX);
  };

  const handlePointerUp = (e) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    setIsSliding(false);
  };

  // Keyboard navigation for slider (ArrowLeft / ArrowRight 5% steps)
  const handleSliderKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPos((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPos((prev) => Math.min(100, prev + 5));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSliderPos(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSliderPos(100);
    }
  };

  return (
    <div className="photo-video-page">
      <div className="container">
        {/* Header */}
        <header className="page-header">
          <div className="telemetry-hud-strip">
            <span className="telemetry-tag">
              <span className="telemetry-dot" aria-hidden="true"></span>
              MEDIA ENGINE & COLOR PIPELINE
            </span>
            <span className="telemetry-tag">4K LOG CURVES // REC.709</span>
          </div>

          <span className="eyebrow">Visual Disciplines</span>
          <h1 className="page-title">Photography & Videography</h1>
          <p className="page-lead">
            High-altitude mountain stills, tonal curve color balancing, and rhythmic cinematic video editing forged across Himalayan trails.
          </p>

          {/* Unified Discipline Switcher Tabs */}
          <div className="media-filter-bar">
            <button
              type="button"
              className={`media-filter-tab ${activeTab === 'all' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              <Sparkles size={15} />
              <span>All Works</span>
            </button>
            <button
              type="button"
              className={`media-filter-tab ${activeTab === 'photo' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('photo')}
            >
              <Camera size={15} />
              <span>Photography & Grading</span>
            </button>
            <button
              type="button"
              className={`media-filter-tab ${activeTab === 'video' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('video')}
            >
              <Film size={15} />
              <span>Cinematic Video</span>
            </button>
          </div>
        </header>

        {/* ------------------------------------------------------------------ */}
        {/* 1. PHOTOGRAPHY GALLERY SECTION                                     */}
        {/* ------------------------------------------------------------------ */}
        {(activeTab === 'all' || activeTab === 'photo') && (
          <section className="photo-gallery-section">
            <div className="section-header">
              <span className="eyebrow">Field Stills</span>
              <h2>Himalayan Landscape Photography</h2>
              <p>
                Authentic trail environments captured across Himachal Pradesh. Click any frame for high-resolution inspection.
              </p>
            </div>

            <div className="photo-editorial-grid">
              {photographyGallery.map((photo, index) => (
                <SpotlightCard
                  key={photo.id}
                  className={`photo-item ${index === 0 || index === 3 ? 'photo-item-lead' : ''}`}
                  onClick={() => setSelectedPhotoIndex(index)}
                >
                  <div className="photo-frame">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="photo-img"
                      loading="lazy"
                    />
                    <div className="photo-item-overlay">
                      <div className="photo-item-meta">
                        <div className="photo-item-header-meta">
                          <span className="photo-item-loc">
                            <MapPin size={12} /> {photo.location}
                          </span>
                          {photo.telemetry && (
                            <span className="photo-item-telemetry">
                              {photo.telemetry}
                            </span>
                          )}
                        </div>
                        <h3 className="photo-item-title">{photo.title}</h3>
                      </div>
                      <span className="photo-view-cue">
                        <Maximize2 size={16} />
                      </span>
                    </div>
                  </div>
                  <div className="photo-item-caption">
                    <span className="caption-text">{photo.caption}</span>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* 2. INTERACTIVE BEFORE / AFTER RAW vs GRADED COMPARISON             */}
        {/* ------------------------------------------------------------------ */}
        {(activeTab === 'all' || activeTab === 'photo') && (
          <section className="comparison-section">
            <div className="section-header">
              <span className="eyebrow">Color Science</span>
              <h2>{photoEditComparison.title}</h2>
              <p>{photoEditComparison.description}</p>
            </div>

            <div className="comparison-card">
              <div
                className="comparison-slider-wrapper"
                ref={sliderContainerRef}
                role="slider"
                tabIndex={0}
                aria-label="Before and after color grading comparison slider"
                aria-valuenow={Math.round(sliderPos)}
                aria-valuemin={0}
                aria-valuemax={100}
                onKeyDown={handleSliderKeyDown}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
              >
                {/* Graded Image (Underneath) */}
                <img
                  src={photoEditComparison.gradedImg}
                  alt={photoEditComparison.gradedLabel}
                  className="comparison-img comparison-graded"
                  draggable={false}
                />
                <span className="slider-label label-graded">{photoEditComparison.gradedLabel}</span>

                {/* RAW Image (Clipped on top) */}
                <div
                  className="comparison-raw-overlay"
                  style={{ width: `${sliderPos}%` }}
                >
                  <img
                    src={photoEditComparison.rawImg}
                    alt={photoEditComparison.rawLabel}
                    className="comparison-img comparison-raw"
                    draggable={false}
                  />
                  <span className="slider-label label-raw">{photoEditComparison.rawLabel}</span>
                </div>

                {/* Divider Handle */}
                <div
                  className="comparison-handle"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="handle-line"></div>
                  <div className="handle-knob">
                    <Sliders size={14} />
                  </div>
                </div>
              </div>

              <div className="comparison-footer-hint">
                <span>Drag the handle horizontally or use ← / → arrow keys to inspect color grade</span>
              </div>
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* 3. CINEMATIC VIDEO SHOWCASE                                        */}
        {/* ------------------------------------------------------------------ */}
        {(activeTab === 'all' || activeTab === 'video') && (
          <section className="video-grid-section">
            <div className="section-header">
              <span className="eyebrow">Moving Image</span>
              <h2>Cinematic Video Sequences</h2>
              <p>
                Rhythmic pacing, tonal curves, and sound design capturing alpine trails and sunset sequences.
              </p>
            </div>

            <div className="video-portfolio-callout">
              <div className="vp-callout-text">
                <span className="telemetry-tag">STANDALONE PRODUCTION SHOWCASE</span>
                <h3>Dedicated Video Portfolio</h3>
                <p>
                  Explore complete high-frame-rate mountain reels, transitions, and edits on my dedicated video platform.
                </p>
              </div>
              <a
                href={profile.social.videoPortfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <span>Launch editzportfolio.netlify.app</span>
                <ArrowUpRight size={16} />
              </a>
            </div>

            <div className="video-editorial-grid">
              {videoShowcase.map((item) => (
                <SpotlightCard
                  key={item.id}
                  className="video-spotlight-card"
                  onClick={() => setActiveVideo(item)}
                >
                  <div className="video-thumb-frame">
                    <img
                      src={item.imgSrc}
                      alt={item.title}
                      className="video-thumb-img"
                      loading="lazy"
                    />
                    <div className="video-play-badge">
                      <Play size={22} className="play-icon" />
                    </div>
                    <span className="telemetry-tag video-tag">{item.category}</span>
                  </div>

                  <div className="video-card-body">
                    <h3 className="video-title">{item.title}</h3>
                    <p className="video-desc">{item.desc}</p>
                  </div>
                </SpotlightCard>
              ))}
            </div>

            <div className="video-ethos-card">
              <span className="eyebrow">Scope & Transparency</span>
              <h3>Post-Production Craft vs. Presentation</h3>
              <p className="ethos-body">
                My primary video expertise centers on <strong>editing, color timing, rhythmic pacing, and ambient sound Foley</strong>. These technical skills directly elevate rich multimedia storytelling on platforms like Discover Himalayan Trails.
              </p>
            </div>
          </section>
        )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 4. LIGHTBOX & MODALS                                               */}
      {/* ------------------------------------------------------------------ */}
      {/* ------------------------------------------------------------------ */}
      {/* 4. FULLSCREEN LIGHTBOX MODAL WITH CYCLING CHEVRONS & TELEMETRY     */}
      {/* ------------------------------------------------------------------ */}
      {selectedPhoto &&
        createPortal(
          <div
            className="photo-lightbox-backdrop"
            onClick={() => setSelectedPhotoIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Photo inspection: ${selectedPhoto.title}`}
          >
            <div
              className="photo-lightbox-modal"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Navigation Bar */}
              <div className="lightbox-top-bar">
                <div className="lightbox-top-left">
                  <span className="lightbox-index-badge">
                    {String(selectedPhotoIndex + 1).padStart(2, '0')} / {String(photographyGallery.length).padStart(2, '0')}
                  </span>
                  <span className="lightbox-loc">
                    <MapPin size={13} /> {selectedPhoto.location}
                  </span>
                  {selectedPhoto.telemetry && (
                    <span className="telemetry-tag lightbox-tag">
                      <span className="telemetry-dot" aria-hidden="true"></span>
                      {selectedPhoto.telemetry}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  className="lightbox-close-btn"
                  onClick={() => setSelectedPhotoIndex(null)}
                  aria-label="Close photo lightbox"
                  title="Close (Escape)"
                >
                  <X size={18} />
                  <span className="lightbox-key-hint">ESC</span>
                </button>
              </div>

              {/* Main Visual Stage with Chevrons */}
              <div className="lightbox-stage">
                <button
                  type="button"
                  className="lightbox-nav-btn lightbox-prev-btn"
                  onClick={handlePrevPhoto}
                  aria-label="Previous photograph (Arrow Left)"
                  title="Previous (Arrow Left)"
                >
                  <ChevronLeft size={24} />
                </button>

                <div className="lightbox-img-frame">
                  <img
                    src={selectedPhoto.src}
                    alt={selectedPhoto.title}
                    className="lightbox-img"
                  />
                </div>

                <button
                  type="button"
                  className="lightbox-nav-btn lightbox-next-btn"
                  onClick={handleNextPhoto}
                  aria-label="Next photograph (Arrow Right)"
                  title="Next (Arrow Right)"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Caption & Telemetry Footer */}
              <div className="lightbox-footer">
                <div className="lightbox-footer-info">
                  <h3 className="lightbox-title">{selectedPhoto.title}</h3>
                  <p className="lightbox-caption">{selectedPhoto.caption}</p>
                </div>
                <div className="lightbox-nav-hint">
                  <span className="lightbox-key-combo">
                    <kbd className="lightbox-kbd">←</kbd>
                    <kbd className="lightbox-kbd">→</kbd>
                    <span>CYCLE</span>
                  </span>
                  <span className="lightbox-key-combo">
                    <kbd className="lightbox-kbd">ESC</kbd>
                    <span>CLOSE</span>
                  </span>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      {activeVideo &&
        createPortal(
          <div
            className="video-modal-backdrop"
            onClick={() => setActiveVideo(null)}
            role="dialog"
            aria-modal="true"
          >
            <div className="video-modal-box" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="video-modal-close"
                onClick={() => setActiveVideo(null)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className="video-player-frame">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                  title={activeVideo.title}
                  className="video-element"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="video-modal-info">
                <span className="telemetry-tag">{activeVideo.category}</span>
                <h3>{activeVideo.title}</h3>
                <p>{activeVideo.desc}</p>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default PhotoVideoPage;
