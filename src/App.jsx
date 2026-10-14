import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import SpaceshipBackground from './components/ui/SpaceshipBackground';

import HomePage from './pages/HomePage';

const TechStackPage = React.lazy(() => import('./pages/TechStackPage'));
const DhtCaseStudyPage = React.lazy(() => import('./pages/DhtCaseStudyPage'));
const PhotoVideoPage = React.lazy(() => import('./pages/PhotoVideoPage'));
const TravelPage = React.lazy(() => import('./pages/TravelPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));

function TelemetryLoadingFallback() {
  return (
    <div className="telemetry-loading-container" aria-live="polite" aria-busy="true">
      <div className="telemetry-tag">
        <span className="telemetry-dot" aria-hidden="true" />
        <span>[LOADING TELEMETRY...]</span>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* Spaceship subtle canvas starfield & orbital background */}
      <SpaceshipBackground />

      <div className="page-wrapper">
        <Navbar />
        <main className="main-content">
          <Suspense fallback={<TelemetryLoadingFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              
              {/* Primary Routes aligned with new requested hierarchy:
                  1. Tech Stack  2. Travel  3. Photography & Videography */}
              <Route path="/tech-stack" element={<TechStackPage />} />
              <Route
                path="/tech-stack/discover-himalayan-trails"
                element={<DhtCaseStudyPage />}
              />
              <Route path="/travel" element={<TravelPage />} />
              <Route path="/photography-video" element={<PhotoVideoPage />} />

              {/* Aliases & Backward Compatibility */}
              <Route
                path="/web-development"
                element={<Navigate to="/tech-stack" replace />}
              />
              <Route
                path="/web-development/discover-himalayan-trails"
                element={<Navigate to="/tech-stack/discover-himalayan-trails" replace />}
              />
              <Route
                path="/dht"
                element={<Navigate to="/tech-stack/discover-himalayan-trails" replace />}
              />
              <Route
                path="/photography"
                element={<Navigate to="/photography-video" replace />}
              />
              <Route
                path="/video"
                element={<Navigate to="/photography-video" replace />}
              />

              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
