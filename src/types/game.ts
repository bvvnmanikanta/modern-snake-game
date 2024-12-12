export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
export type Position = { x: number; y: number };

export interface GameState {
  snake: Position[];
  food: Position;
  direction: Direction;
  gameOver: boolean;
}

export interface GameColors {
  snakeHead: string;
  snakeBody: string;
  food: string;
}

export interface GameSettings {
  colors: GameColors;
  speed: number;
}