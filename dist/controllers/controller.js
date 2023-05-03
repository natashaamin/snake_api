"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateState = exports.validateGame = exports.newGame = void 0;
const uuid_1 = require("uuid");
const service_1 = require("../services/service");
const newGame = (req, res) => {
    const width = parseInt(req.query.w, 10);
    const height = parseInt(req.query.h, 10);
    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
        (0, service_1.returnErrorResponse)(res, "Invalid request", 400);
        return;
    }
    const gameState = {
        gameId: (0, uuid_1.v4)(),
        width: width,
        height: height,
        score: 0,
        fruit: (0, service_1.generateNewFruitPosition)(width, height),
        snake: { x: 0, y: 0, velX: 1, velY: 0 },
    };
    res.status(200).json(gameState);
};
exports.newGame = newGame;
const validateGame = (req, res) => {
    const { state, ticks } = req.body;
    // Check if request body contains all required fields
    const errorMessage = (0, exports.validateState)(req.body);
    if (errorMessage) {
        return (0, service_1.returnErrorResponse)(res, errorMessage, 400);
    }
    // Check if the current movement is valid or not
    // Get the last movement and the previous movement (if it exists) from the ticks array.
    const lastTick = ticks[ticks.length - 1];
    const lastVelX = lastTick.velX;
    const lastVelY = lastTick.velY;
    const prevVelX = ticks.length > 1 ? ticks[ticks.length - 2].velX : 0;
    const prevVelY = ticks.length > 1 ? ticks[ticks.length - 2].velY : 0;
    if ((lastVelX === 1 && prevVelX === -1) ||
        (lastVelX === -1 && prevVelX === 1) ||
        (lastVelY === 1 && prevVelY === -1) ||
        (lastVelY === -1 && prevVelY === 1)) {
        (0, service_1.returnErrorResponse)(res, "Invalid move", 418);
        return;
    }
    // Validate state and ticks
    let gameState = state;
    let isFound = false;
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
    if (newSnakeX < 0 ||
        newSnakeX >= state.width ||
        newSnakeY < 0 ||
        newSnakeY >= state.height) {
        (0, service_1.returnErrorResponse)(res, "Game over: snake went out of bounds", 418);
        return;
    }
    if (newSnakeX === state.fruit.x && newSnakeY === state.fruit.y) {
        isFound = true;
        gameState.snake.x = newSnakeX;
        gameState.snake.y = newSnakeY;
    }
    if (isFound) {
        gameState.score++;
        gameState.fruit = (0, service_1.generateNewFruitPosition)(gameState.width, gameState.height);
        // Generate new fruit position and increment score
        gameState = {
            ...gameState,
            score: gameState.score + 1,
            fruit: {
                x: (0, service_1.randomInt)(0, gameState.width - 1),
                y: (0, service_1.randomInt)(0, gameState.height - 1),
            },
        };
    }
    else {
        (0, service_1.returnErrorResponse)(res, "Fruit not found - ticks do not lead the snake to the fruit position", 404);
        return;
    }
    res.status(200).json(gameState);
};
exports.validateGame = validateGame;
const validateState = (gameState) => {
    const { state, ticks } = gameState;
    if (state.gameId === "") {
        return "GameID not specified";
    }
    if (state.width <= 0 || state.height <= 0) {
        return "Game board has incorrect size";
    }
    else if (state.fruit.x < 0 ||
        state.fruit.x >= state.width ||
        state.fruit.y < 0 ||
        state.fruit.y >= state.height ||
        (state.fruit.x == state.snake.x && state.fruit.y == state.snake.y)) {
        return "Fruit is in incorrect position";
    }
    if (state.snake.velX < -1 ||
        state.snake.velX > 1 ||
        state.snake.velY < -1 ||
        state.snake.velY > 1 ||
        state.snake.velX == state.snake.velY) {
        return "Snake has incorrect initial velocity";
    }
    if (state.score < 0) {
        return "Score cannot be negative number";
    }
    if (ticks.length === 0) {
        return "Ticks are not specified";
    }
};
exports.validateState = validateState;
//# sourceMappingURL=controller.js.map