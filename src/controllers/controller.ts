import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  generateNewFruitPosition,
  randomInt,
  returnErrorResponse,
} from "../services/service";
import { GameSate, State, Velocity } from "../types";

export const newGame = (req: Request, res: Response) => {
  const width = parseInt(req.query.w as string, 10);
  const height = parseInt(req.query.h as string, 10);

  if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
    returnErrorResponse(res, "Invalid request", 400);
    return;
  }

  const gameState: State = {
    gameId: uuidv4(),
    width: width,
    height: height,
    score: 0,
    fruit: generateNewFruitPosition(width, height),
    snake: { x: 0, y: 0, velX: 1, velY: 0 },
  };

  res.status(200).json(gameState);
};

export const validateGame = (req: Request, res: Response) => {
  console.log(req.body,"rachel")
  const { state, ticks } = req.body;

  // Check if request body contains all required fields
  const errorMessage = validateState(req.body);
  if (errorMessage) {
    return returnErrorResponse(res, errorMessage, 400);
  }

  // Validate state and ticks
  let gameState: State = state;
  let isFound: boolean = false;
  let totalVelX = 0;
  let totalVelY = 0;

  for (const tick of ticks) {
    totalVelX += tick.velX;
    totalVelY += tick.velY;
  }

  // Calculate the new position of the snake
  const newSnakeX = state.snake.x + totalVelX;
  const newSnakeY = state.snake.y + totalVelY;

  // Check if the snake has hit the edge of the game board
  if (
    newSnakeX < 0 ||
    newSnakeX >= state.width ||
    newSnakeY < 0 ||
    newSnakeY >= state.height
  ) {
    returnErrorResponse(res, "Game over: snake went out of bounds", 418);
    return;
  }
  
  if (newSnakeX === state.fruit.x && newSnakeY === state.fruit.y) {
    isFound = true;
    gameState.snake.x = newSnakeX;
    gameState.snake.y = newSnakeY;
  }

  if (isFound) {
    gameState.score++;
    gameState.fruit = generateNewFruitPosition(
      gameState.width,
      gameState.height
    );

    // Generate new fruit position and increment score
    gameState = {
      ...gameState,
      score: gameState.score + 1,
      fruit: {
        x: randomInt(0, gameState.width - 1),
        y: randomInt(0, gameState.height - 1),
      },
    };
  } else {
    returnErrorResponse(
      res,
      "Fruit not found - ticks do not lead the snake to the fruit position",
      404
    );
    return;
  }
  res.status(200).json(gameState);
};

export const validateState = (gameState: GameSate) => {
  const { state, ticks } = gameState;

  if (state.gameId === "") {
    return "GameID not specified";
  }

  if (state.width <= 0 || state.height <= 0) {
    return "Game board has incorrect size";
  } else if (
    state.fruit.x < 0 ||
    state.fruit.x >= state.width ||
    state.fruit.y < 0 ||
    state.fruit.y >= state.height ||
    (state.fruit.x == state.snake.x && state.fruit.y == state.snake.y)
  ) {
    return "Fruit is in incorrect position";
  }

  if (
    state.snake.velX < -1 ||
    state.snake.velX > 1 ||
    state.snake.velY < -1 ||
    state.snake.velY > 1 ||
    state.snake.velX == state.snake.velY
  ) {
    return "Snake has incorrect initial velocity";
  }

  if (state.score < 0) {
    return "Score cannot be negative number";
  }

  if (ticks.length === 0) {
    return "Ticks are not specified";
  }
};
