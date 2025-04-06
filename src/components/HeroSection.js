import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import './HeroSection.css';

// 預設背景圖片（請替換為您本地 public/assets 中的圖片路徑）
const DEFAULT_IMAGE = '/assets/default-background.png';

const HeroSection = () => {
  const [currentBackground, setCurrentBackground] = useState(DEFAULT_IMAGE);
  const [nextBackground, setNextBackground] = useState(null);
  const [isFading, setIsFading] = useState(false);
  const [photographer, setPhotographer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 動畫變體
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  // 從 Unsplash API 獲取隨機圖片
  useEffect(() => {
    const fetchRandomImage = async () => {
      setLoading(true);
      setError(null);

      // 清除緩存
      localStorage.removeItem('backgroundImage');
      localStorage.removeItem('photographer');

      try {
        const collectionId = '81RGUV5W_Uo'; // 您的收藏 ID
        const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY; // 環境變數
        const response = await axios.get('https://api.unsplash.com/photos/random', {
          params: {
            collections: collectionId,
            client_id: accessKey,
            w: 1920, // 自定義寬度 1920px
            q: 85,   // 自定義質量 85（範圍 0-100）
          },
        });

        // 使用 full 尺寸（最高質量）
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

          // 緩存圖片 URL 和攝影師資訊
          localStorage.setItem('backgroundImage', imageUrl);
          localStorage.setItem('photographer', JSON.stringify({
            name: response.data.user.name,
            username: response.data.user.username,
            profileUrl: response.data.user.links.html,
          }));
        };
        img.onerror = () => {
          throw new Error('無法載入圖片');
        };
      } catch (err) {
        setError('無法獲取背景圖片，將使用預設背景。');
        setCurrentBackground(DEFAULT_IMAGE);
        setPhotographer(null);
        localStorage.removeItem('backgroundImage');
        localStorage.removeItem('photographer');
      } finally {
        setLoading(false);
      }
    };

    fetchRandomImage();
  }, []); // 僅在組件掛載時運行

  // 處理淡入淡出完成
  const handleFadeComplete = () => {
    setCurrentBackground(nextBackground);
    setNextBackground(null);
    setIsFading(false);
  };

  return (
    <div className="hero-container">
      <div className="hero-background">
        {/* 當前背景 */}
        {loading ? (
          <div className="loading">載入中...</div>
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
        {/* 漸層覆蓋 */}
        <div className="gradient-overlay" />

        {/* 標語容器 */}
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
            打造無縫數位體驗。
          </motion.p>
        </div>

        {/* 主要內容 */}
        <div className="hero-content">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
          >
            創造您的數位現實。
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.6 }}
          >
            從無到有，讓我們將您的願景變為現實。
          </motion.p>
        </div>

        {/* 頁腳與攝影師署名 */}
        <div className="hero-footer">
          <div className="brand footer-links">
            Tomy. Hong Kong <span>🇭🇰</span> / 
            <a href="#web">Instagram</a>
            <span className="dot">•</span>
            <a href="#product">Threads</a>
            <span className="dot">•</span>
            <a href="#brand">X.com</a>
          </div>
          <div className="footer-links">
            {photographer && (
              <>
                <span className="photographer-credit">
                  照片由{' '}
                  <a href={`${photographer.profileUrl}?utm_source=tomy_hk&utm_medium=referral`} target="_blank" rel="noopener noreferrer">
                    {photographer.name}
                  </a>{' '}
                  提供於{' '}
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