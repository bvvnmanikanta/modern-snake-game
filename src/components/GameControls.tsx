import React from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import ColorPicker from './ColorPicker';
import { Direction, GameColors } from '../types/game';

interface GameControlsProps {
  score: number;
  highScore: number;
  isPaused: boolean;
  gameSpeed: number;
  direction: Direction;
  colors: GameColors;
  onPause: () => void;
  onRestart: () => void;
  onSpeedChange: (speed: number) => void;
  onColorChange: (colors: Partial<GameColors>) => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  score,
  highScore,
  isPaused,
  gameSpeed,
  direction,
  colors,
  onPause,
  onRestart,
  onSpeedChange,
  onColorChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">
          <span className="mr-4">Score: {score}</span>
          <span>High Score: {highScore}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onPause}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            {isPaused ? 'Resume' : 'Pause'}
          </button>
          <button
            onClick={onRestart}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Restart
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <select
          value={gameSpeed}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
          className="px-4 py-2 rounded border bg-gray-800 text-white"
        >
          <option value={200}>Slow</option>
          <option value={150}>Medium</option>
          <option value={100}>Fast</option>
        </select>

        <div className="flex items-center gap-2">
          <span>Direction:</span>
          {direction === 'UP' && <ArrowUp />}
          {direction === 'DOWN' && <ArrowDown />}
          {direction === 'LEFT' && <ArrowLeft />}
          {direction === 'RIGHT' && <ArrowRight />}
        </div>

        <ColorPicker colors={colors} onColorChange={onColorChange} />
      </div>
    </div>
  );
};

export default GameControls;