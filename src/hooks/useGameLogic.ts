import { useState, useEffect, useRef, useCallback } from 'react';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

interface GameState {
  snake: Position[];
  food: Position;
  direction: Direction;
  gameOver: boolean;
}

const GRID_SIZE = 20;
const INITIAL_SNAKE: Position[] = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];

const createFood = (snake: Position[]): Position => {
  let food: Position;
  do {
    food = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (snake.some(segment => segment.x === food.x && segment.y === food.y));
  return food;
};

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    snake: INITIAL_SNAKE,
    food: createFood(INITIAL_SNAKE),
    direction: 'UP',
    gameOver: false,
  });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(150);
  const gameLoopRef = useRef<number>();
  const boardRef = useRef<HTMLDivElement>(null);

  const moveSnake = useCallback(() => {
    if (isPaused || gameState.gameOver) return;

    setGameState(prev => {
      const newHead = { ...prev.snake[0] };
      
      switch (prev.direction) {
        case 'UP':
          newHead.y -= 1;
          break;
        case 'DOWN':
          newHead.y += 1;
          break;
        case 'LEFT':
          newHead.x -= 1;
          break;
        case 'RIGHT':
          newHead.x += 1;
          break;
      }

      // Check collision with walls
      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE
      ) {
        return { ...prev, gameOver: true };
      }

      // Check collision with self
      if (prev.snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        return { ...prev, gameOver: true };
      }

      const newSnake = [newHead, ...prev.snake];
      
      // Check if food is eaten
      if (newHead.x === prev.food.x && newHead.y === prev.food.y) {
        setScore(s => s + 1);
        return {
          ...prev,
          snake: newSnake,
          food: createFood(newSnake),
        };
      }

      newSnake.pop();
      return {
        ...prev,
        snake: newSnake,
      };
    });
  }, [isPaused, gameState.gameOver]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (gameState.gameOver) return;

    const key = event.key.toLowerCase();
    setGameState(prev => {
      let newDirection = prev.direction;

      switch (key) {
        case 'arrowup':
        case 'w':
          if (prev.direction !== 'DOWN') newDirection = 'UP';
          break;
        case 'arrowdown':
        case 's':
          if (prev.direction !== 'UP') newDirection = 'DOWN';
          break;
        case 'arrowleft':
        case 'a':
          if (prev.direction !== 'RIGHT') newDirection = 'LEFT';
          break;
        case 'arrowright':
        case 'd':
          if (prev.direction !== 'LEFT') newDirection = 'RIGHT';
          break;
        case ' ':
          setIsPaused(p => !p);
          break;
      }

      return { ...prev, direction: newDirection };
    });
  }, [gameState.gameOver]);

  const restartGame = useCallback(() => {
    setGameState({
      snake: INITIAL_SNAKE,
      food: createFood(INITIAL_SNAKE),
      direction: 'UP',
      gameOver: false,
    });
    setScore(0);
    setIsPaused(false);
  }, []);

  const togglePause = () => setIsPaused(p => !p);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore]);

  useEffect(() => {
    boardRef.current?.focus();
    const interval = setInterval(moveSnake, gameSpeed);
    return () => clearInterval(interval);
  }, [moveSnake, gameSpeed]);

  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;

    board.focus();
    board.addEventListener('keydown', handleKeyPress);
    return () => board.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return {
    gameState,
    score,
    highScore,
    isPaused,
    gameSpeed,
    direction: gameState.direction,
    handleKeyPress,
    togglePause,
    restartGame,
    setGameSpeed,
    boardRef,
  };
};