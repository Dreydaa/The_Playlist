// hooks/useBackgroundEffects.js
import { useState, useEffect } from 'react';
import { extractMainColor } from './colorExtractor';

/**
 * Determines if a color is light or dark and returns appropriate text color
 * @param {string} color - RGB color string like "rgb(255, 255, 255)" or hex like "#ffffff"
 * @returns {string} - Returns "white" or "black"
 */
const getContrastColor = (color) => {
  let r, g, b;
  
  // Handle RGB format
  if (color.startsWith('rgb')) {
    const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      r = parseInt(match[1]);
      g = parseInt(match[2]);
      b = parseInt(match[3]);
    }
  }
  // Handle hex format
  else if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    r = parseInt(hex.substr(0, 2), 16);
    g = parseInt(hex.substr(2, 2), 16);
    b = parseInt(hex.substr(4, 2), 16);
  }
  
  // Calculate luminance using the standard formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return black for light colors, white for dark colors
  return luminance > 0.5 ? 'black' : 'white';
};

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

  const getIconColor = () => {
    if (activeEffect === 'colored') {
      return getContrastColor(mainColor);
    }
    // For blur and noise effects, default to white (assuming darker backgrounds)
    return 'white';
  };

  return {
    activeEffect,
    setActiveEffect,
    getBackgroundStyle,
    getIconColor,
    isLoadingColor
  };
};