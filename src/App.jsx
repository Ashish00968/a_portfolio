import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import BeforeAfter from './components/BeforeAfter';
import Pricing from './components/Pricing';


import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container">
      <div className="bg-grid"></div>
      <Navbar />
      <Hero />
      <main>
        <Portfolio />
        <BeforeAfter />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}

export default App;
