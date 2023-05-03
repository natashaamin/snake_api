"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.returnErrorResponse = exports.handleMethodNotAllowed = exports.generateNewFruitPosition = exports.randomInt = void 0;
const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
exports.randomInt = randomInt;
const generateNewFruitPosition = (width, height) => {
    return { x: (0, exports.randomInt)(0, width - 1), y: (0, exports.randomInt)(0, height - 1) };
};
exports.generateNewFruitPosition = generateNewFruitPosition;
const handleMethodNotAllowed = (req, res, next) => {
    (0, exports.returnErrorResponse)(res, "Invalid method", 405);
};
exports.handleMethodNotAllowed = handleMethodNotAllowed;
const returnErrorResponse = (res, error, status = 500) => {
    console.error(error);
    res.status(status).send({
        message: error,
    });
};
exports.returnErrorResponse = returnErrorResponse;
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error" });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=services.js.map