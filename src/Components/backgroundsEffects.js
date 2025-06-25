// hooks/useBackgroundEffects.js
import { useState, useEffect } from 'react';
import { extractMainColor } from './colorExtractor';

export const useBackgroundEffects = (currentTrack) => {
  const [activeEffect, setActiveEffect] = useState('colored');
  const [mainColor, setMainColor] = useState('#1DB954'); // Default Spotify green
  const [isLoadingColor, setIsLoadingColor] = useState(false);

  useEffect(() => {
    if (activeEffect === 'colored' && currentTrack?.coverArt) {
      setIsLoadingColor(true);
      extractMainColor(currentTrack.coverArt)
        .then(color => {
          setMainColor(color);
          setIsLoadingColor(false);
        })
        .catch(() => {
          setMainColor('#1DB954');
          setIsLoadingColor(false);
        });
    }
  }, [currentTrack?.coverArt, activeEffect]);

  const getBackgroundStyle = () => {
    switch (activeEffect) {
      case 'colored':
        return {
          background: `${mainColor} 100%`,
        };
      case 'blur':
        return {
          background: currentTrack?.coverArt ? `url(${currentTrack.coverArt}) center/cover` : '#121212',
        };
      case 'noise':
        return {
          background: currentTrack?.coverArt ? `url(${currentTrack.coverArt}) center/cover` : '#121212',
        };
      default:
        return {
          background: '#121212',
        };
    }
  };

  return {
    activeEffect,
    setActiveEffect,
    getBackgroundStyle,
    isLoadingColor
  };
};