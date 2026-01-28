/**
 * Avira Vastra - Premium Saree E-Commerce
 * Mobile-First Design
 */

import { useState, useEffect } from 'react';

// Components
import Header from './components/Header';
import MobileMenu from './components/MobileMenu';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import ShopByOccasion from './components/ShopByOccasion';
import HeritageWeaves from './components/HeritageWeaves';
import NewArrivals from './components/NewArrivals';
import BrandStory from './components/BrandStory';
import BrandPromise from './components/BrandPromise';
import WhatsAppHelp from './components/WhatsAppHelp';
import WhySurat from './components/WhySurat';
import Footer from './components/Footer';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for header transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle body scroll lock when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isMenuOpen]);

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <Header onMenuOpen={handleMenuOpen} isScrolled={isScrolled} />
      <MobileMenu isOpen={isMenuOpen} onClose={handleMenuClose} />
      <main>
        <Hero />
        <TrustStrip />
        <ShopByOccasion />
        <HeritageWeaves />
        <NewArrivals />
        <BrandStory />
        <WhatsAppHelp />
        <WhySurat />
      </main>
      <Footer />
    </>
  );
}

export default App;
