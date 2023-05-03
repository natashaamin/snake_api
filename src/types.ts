export type Fruit = {
  x: number;
  y: number;
};

export type Snake = {
  x: number;
  y: number;
  velX: number;
  velY: number;
};

export type State = {
  gameId: string;
  width: number;
  height: number;
  score: number;
  fruit: Fruit;
  snake: Snake;
};

export type Velocity = {
  velX: number;
  velY: number;
}

export interface GameSate {
  state: State,
  ticks: Velocity[]
}