import { useState } from 'react';
import { GameSettings } from '../types/game';

const DEFAULT_SETTINGS: GameSettings = {
  colors: {
    snakeHead: '#22c55e', // green-500
    snakeBody: '#16a34a', // green-600
    food: '#ef4444',      // red-500
  },
  speed: 150,
};

export const useGameSettings = () => {
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);

  const updateColors = (colors: Partial<GameSettings['colors']>) => {
    setSettings(prev => ({
      ...prev,
      colors: { ...prev.colors, ...colors },
    }));
  };

  const updateSpeed = (speed: number) => {
    setSettings(prev => ({ ...prev, speed }));
  };

  return {
    settings,
    updateColors,
    updateSpeed,
  };
};