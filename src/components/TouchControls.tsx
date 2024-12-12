import React from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface TouchControlsProps {
  onDirectionChange: (event: any) => void;
}

const TouchControls: React.FC<TouchControlsProps> = ({ onDirectionChange }) => {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col gap-2 md:hidden">
      <div className="flex justify-center">
        <button
          onClick={() => onDirectionChange({ key: 'ArrowUp' })}
          className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center"
        >
          <ArrowUp className="text-white" />
        </button>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onDirectionChange({ key: 'ArrowLeft' })}
          className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center"
        >
          <ArrowLeft className="text-white" />
        </button>
        <button
          onClick={() => onDirectionChange({ key: 'ArrowDown' })}
          className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center"
        >
          <ArrowDown className="text-white" />
        </button>
        <button
          onClick={() => onDirectionChange({ key: 'ArrowRight' })}
          className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center"
        >
          <ArrowRight className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default TouchControls;