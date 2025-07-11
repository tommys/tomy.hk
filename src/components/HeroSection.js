import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import './HeroSection.css';

// Default image to display while loading (replace with a local image in public/assets)
const DEFAULT_IMAGE = '/assets/default-background.png';

const HeroSection = () => {
    const [currentBackground, setCurrentBackground] = useState(DEFAULT_IMAGE);
    const [nextBackground, setNextBackground] = useState(null);
    const [isFading, setIsFading] = useState(false);
    const [photographer, setPhotographer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPhotographerDetails, setShowPhotographerDetails] = useState(false);

    // Animation variants for the elements
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    // Fetch a random image from the Unsplash API
    useEffect(() => {
        const fetchRandomImage = async () => {
            setLoading(true);
            setError(null);

            // Clear cache on every page load
            localStorage.removeItem('backgroundImage');
            localStorage.removeItem('photographer');

            try {
                const collectionId = '81RGUV5W_Uo'; // Your collection ID
                const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY; // Use environment variable
                const response = await axios.get('https://api.unsplash.com/photos/random', {
                    params: {
                        collections: collectionId,
                        client_id: accessKey,
                        w: 2560, // Custom width 1920px / 2560px
                        q: 100, // Custom quality 85 (range 0-100)
                    },
                });

                // Use full size (highest quality) instead of regular
                const imageUrl = response.data.urls.full;
                const img = new Image();
                img.src = imageUrl;
                img.onload = () => {
                    setIsFading(true);
                    setNextBackground(imageUrl);
                    setPhotographer({
                        name: response.data.user.name,
                        username: response.data.user.username,
                        profileUrl: response.data.user.links.html,
                    });

                    // Cache the image URL and photographer details in localStorage
                    localStorage.setItem('backgroundImage', imageUrl);
                    localStorage.setItem('photographer', JSON.stringify({
                        name: response.data.user.name,
                        username: response.data.user.username,
                        profileUrl: response.data.user.links.html,
                    }));
                };
                img.onerror = () => {
                    throw new Error('Failed to load image');
                };
            } catch (err) {
                setError('Failed to fetch background image. Using default background.');
                setCurrentBackground(DEFAULT_IMAGE);
                setPhotographer(null);
                localStorage.removeItem('backgroundImage');
                localStorage.removeItem('photographer');
            } finally {
                setLoading(false);
            }
        };

        fetchRandomImage();
    }, []); // Empty dependency array ensures this runs only on mount (page load)

    // Handle fade transition completion
    const handleFadeComplete = () => {
        setCurrentBackground(nextBackground);
        setNextBackground(null);
        setIsFading(false);
    };


    // Add this with other state hooks
    const quotes = [
        "Simplicity is the ultimate sophistication. – Leonardo da Vinci",
        "Code is like humor. When you have to explain it, it’s bad. – Cory House",
        "Design is not just what it looks like and feels like. Design is how it works. – Steve Jobs",
        "Stay hungry, stay foolish. – Steve Jobs",
        "The best way to predict the future is to invent it. – Alan Kay",
    ];

    const [dailyQuote, setDailyQuote] = useState("");

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setDailyQuote(quotes[randomIndex]);
    }, []);






    return (
        <div className="hero-container">
      <div className="hero-background">
        {/* Current Background */}
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            <div
              className="background-layer"
              style={{ backgroundImage: `url(${currentBackground})`, opacity: isFading ? 0 : 1 }}
            />
            {nextBackground && (
              <div
                className="background-layer"
                style={{ backgroundImage: `url(${nextBackground})`, opacity: isFading ? 1 : 0 }}
                onTransitionEnd={handleFadeComplete}
              />
            )}
          </>
        )}
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

          <motion.p
            className="daily-quote"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.8 }}
          >
          {dailyQuote}
          </motion.p>

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

        {/* Footer with Photographer Credit */}
        <div className="hero-footer">
          <div className="brand footer-links">
            Tomy. Hong Kong <span>🇭🇰</span> / 
            <a href="https://www.instagram.com/icedmilkteahk/" target="_blank">Instagram</a>
            <span className="dot">•</span>
            <a href="https://www.threads.net/@icedmilkteahk" target="_blank">Threads</a>
            <span className="dot">•</span>
            <a href="https://x.com/tommyswf" target="_blank">X.com</a>
          </div>
          <div className="footer-links">
            {photographer && (
              <>
                <span className="photographer-credit">
                  Photo by{' '}
                  <a href={`${photographer.profileUrl}?utm_source=tomy_hk&utm_medium=referral`} target="_blank" rel="noopener noreferrer">
                    {photographer.name}
                  </a>{' '}
                  on{' '}
                  <a href="https://unsplash.com?utm_source=tomy_hk&utm_medium=referral" target="_blank" rel="noopener noreferrer">
                    Unsplash
                  </a>
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
    );
};

export default HeroSection;