"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
describe('GET /new', () => {
    it('should return 200 with valid width and height query parameters', async () => {
        const response = await (0, supertest_1.default)(app_1.app).get('/new?w=10&h=10');
        expect(response.status).toBe(200);
    });
    it('should return 400 with invalid width and height query parameters', async () => {
        const response = await (0, supertest_1.default)(app_1.app).get('/new?w=0&h=10');
        expect(response.status).toBe(400);
    });
    it('should return 405 with invalid HTTP method', async () => {
        const response = await (0, supertest_1.default)(app_1.app).post('/new?w=10&h=10');
        expect(response.status).toBe(405);
    });
});
//# sourceMappingURL=newGame.spec.js.map