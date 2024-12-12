import React from 'react';
import { GameColors } from '../types/game';

interface ColorPickerProps {
  colors: GameColors;
  onColorChange: (colors: Partial<GameColors>) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ colors, onColorChange }) => {
  return (
    <div className="flex gap-4 items-center">
      <div className="flex items-center gap-2">
        <label htmlFor="snakeHead" className="text-sm">Head:</label>
        <input
          type="color"
          id="snakeHead"
          value={colors.snakeHead}
          onChange={(e) => onColorChange({ snakeHead: e.target.value })}
          className="w-8 h-8 rounded cursor-pointer"
        />
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="snakeBody" className="text-sm">Body:</label>
        <input
          type="color"
          id="snakeBody"
          value={colors.snakeBody}
          onChange={(e) => onColorChange({ snakeBody: e.target.value })}
          className="w-8 h-8 rounded cursor-pointer"
        />
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="food" className="text-sm">Food:</label>
        <input
          type="color"
          id="food"
          value={colors.food}
          onChange={(e) => onColorChange({ food: e.target.value })}
          className="w-8 h-8 rounded cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ColorPicker;