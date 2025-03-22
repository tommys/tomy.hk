import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './HeroSection.css';

// List of background images
const backgroundImages = [
  'https://images.unsplash.com/photo-1742226111230-1f7620e64851?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1742226111627-260d93f0cdb3?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1633084069286-4abad35d62d2?q=80&w=3142&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

const HeroSection = () => {
  const [currentBackground, setCurrentBackground] = useState(0);

  // Animation variants for the elements
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  // Select a random background image on page load
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    setCurrentBackground(randomIndex);
  }, []); // Empty dependency array ensures this runs only on mount (page load)

  // Preload images to avoid flickering
  useEffect(() => {
    backgroundImages.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  }, []);

  return (
    <div className="hero-container">
      <div className="hero-background">
        {/* Current Background */}
        <div
          className="background-layer"
          style={{ backgroundImage: `url(${backgroundImages[currentBackground]})` }}
        />
        {/* Gradient Overlay */}
        <div className="gradient-overlay" />

        {/* Tagline Container with Left and Right Divs */}
        <div className="tagline-container">
          <motion.p
            className="tagline-left"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            Tommy SZE.
          </motion.p>
          <motion.p
            className="tagline-right"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            Crafting Seamless Digital Experiences.
          </motion.p>
        </div>

        {/* Main Content with animation */}
        <div className="hero-content">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
          >
            Create your digital reality.
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.6 }}
          >
            From nothing to everything, let’s bring your vision to life.
          </motion.p>
      
        </div>

        {/* Footer */}
        <div className="hero-footer">
          <div className="brand">Tomy. Hong Kong 🇭🇰</div>
          <div className="footer-links">
            <a href="#web">Instagram</a>
            <span className="dot">•</span>
            <a href="#product">Threads</a>
            <span className="dot">•</span>
            <a href="#brand">X.com</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;