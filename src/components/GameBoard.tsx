import React from 'react';
import { useGameLogic } from '../hooks/useGameLogic';
import { useGameSettings } from '../hooks/useGameSettings';
import GameControls from './GameControls';
import TouchControls from './TouchControls';

const GameBoard: React.FC = () => {
  const {
    gameState,
    score,
    highScore,
    isPaused,
    direction,
    handleKeyPress,
    togglePause,
    restartGame,
    boardRef
  } = useGameLogic();

  const { settings, updateColors, updateSpeed } = useGameSettings();

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <GameControls
        score={score}
        highScore={highScore}
        isPaused={isPaused}
        gameSpeed={settings.speed}
        direction={direction}
        colors={settings.colors}
        onPause={togglePause}
        onRestart={restartGame}
        onSpeedChange={updateSpeed}
        onColorChange={updateColors}
      />

      <div 
        ref={boardRef}
        tabIndex={0}
        onKeyDown={handleKeyPress}
        className="relative aspect-square w-full max-w-2xl bg-gray-800 rounded-lg overflow-hidden focus:outline-none mt-4"
      >
        <div className="absolute inset-0 grid grid-cols-20 grid-rows-20">
          {Array.from({ length: 400 }).map((_, i) => (
            <div key={i} className="border border-gray-700/30" />
          ))}
        </div>

        {gameState.snake.map((segment, i) => (
          <div
            key={i}
            style={{
              left: `${(segment.x * 100) / 20}%`,
              top: `${(segment.y * 100) / 20}%`,
              width: `${100 / 20}%`,
              height: `${100 / 20}%`,
              backgroundColor: i === 0 ? settings.colors.snakeHead : settings.colors.snakeBody,
            }}
            className="absolute rounded-sm transition-all duration-75"
          />
        ))}

        <div
          style={{
            left: `${(gameState.food.x * 100) / 20}%`,
            top: `${(gameState.food.y * 100) / 20}%`,
            width: `${100 / 20}%`,
            height: `${100 / 20}%`,
            backgroundColor: settings.colors.food,
          }}
          className="absolute rounded-full animate-pulse"
        />

        {gameState.gameOver && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center flex-col">
            <h2 className="text-4xl font-bold text-white mb-4">Game Over!</h2>
            <p className="text-2xl text-white mb-4">Final Score: {score}</p>
            <button
              onClick={restartGame}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Play Again
            </button>
          </div>
        )}

        <TouchControls onDirectionChange={handleKeyPress} />
      </div>
    </div>
  );
};

export default GameBoard;