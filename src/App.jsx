import React, { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import ScrollTimeline from './components/ScrollTimeline';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import StatsCounter from './components/StatsCounter';
import BeforeAfter from './components/BeforeAfter';
import EditingProcess from './components/EditingProcess';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <div className="app-container">
        <ScrollTimeline />
        <div className="bg-grid"></div>
        <Navbar />
        <Hero />
        <main>
          <Portfolio />
          <StatsCounter />
          <BeforeAfter />
          <EditingProcess />
          <Pricing />
        </main>
        <Footer />
        <FloatingContact />
      </div>
    </>
  );
}

export default App;
