"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
describe('validateGame', () => {
    it('should return 200 with updated game state when input is valid', async () => {
        const gameState = {
            "state": {
                "gameId": "da291672-1831-4f3c-a215-138166c8e401",
                "width": 5,
                "height": 5,
                "score": 0,
                "fruit": {
                    "x": 4,
                    "y": 0
                },
                "snake": {
                    "x": 0,
                    "y": 0,
                    "velX": 1,
                    "velY": 0
                }
            },
            "ticks": [
                {
                    "velX": 1,
                    "velY": 0
                },
                {
                    "velX": 1,
                    "velY": 0
                },
                {
                    "velX": 1,
                    "velY": 0
                },
                {
                    "velX": 1,
                    "velY": 0
                },
                {
                    "velX": 0,
                    "velY": 0
                }
            ]
        };
        const response = await (0, supertest_1.default)(app_1.default)
            .post('/validate')
            .send(gameState);
        expect(response.status).toBe(200);
        expect(response.body.snake.x).toBe(4);
        expect(response.body.snake.y).toBe(0);
        expect(response.body.score).toBe(2);
    });
    it('should return 400 with error message when input is missing required fields', async () => {
        const gameState = {
            state: {
                gameId: '',
                width: 0,
                height: 0,
                fruit: { x: 0, y: 0 },
                snake: { x: 0, y: 0, velX: 0, velY: 0 },
                score: -1,
            },
            ticks: [],
        };
        const response = await (0, supertest_1.default)(app_1.default)
            .post('/validate')
            .send(gameState);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('GameID not specified');
    });
    it('should return 404 with error message when fruit is not found', async () => {
        const gameState = {
            state: {
                gameId: 'abc123',
                width: 10,
                height: 10,
                fruit: { x: 2, y: 2 },
                snake: { x: 0, y: 0, velX: 1, velY: 0 },
                score: 0,
            },
            ticks: [
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
                { velX: 1, velY: 0 },
            ],
        };
        const response = await (0, supertest_1.default)(app_1.default)
            .post('/validate')
            .send(gameState);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Fruit not found - ticks do not lead the snake to the fruit position');
    });
    it('should return 418 with error message when snake goes out of bounds', async () => {
        const gameState = {
            state: {
                gameId: 'abc123',
                width: 10,
                height: 10,
                fruit: { x: 2, y: 2 },
                snake: { x: 9, y: 9, velX: 1, velY: 0 },
                score: 0,
            },
            ticks: [{ velX: 1, velY: 0 }],
        };
        const response = await (0, supertest_1.default)(app_1.default)
            .post('/validate')
            .send(gameState);
        expect(response.status).toBe(418);
        expect(response.body.message).toBe('Game over: snake went out of bounds');
    });
});
//# sourceMappingURL=validateGame.spec.js.map