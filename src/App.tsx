import React from 'react';
import GameBoard from './components/GameBoard';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Snake Game</h1>
        <GameBoard />
        
        <div className="mt-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">How to Play</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Desktop Controls</h3>
              <ul className="space-y-2">
                <li>↑ or W: Move Up</li>
                <li>↓ or S: Move Down</li>
                <li>← or A: Move Left</li>
                <li>→ or D: Move Right</li>
                <li>Space: Pause/Resume</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Mobile Controls</h3>
              <p>Use the on-screen arrow buttons to control the snake's direction.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;