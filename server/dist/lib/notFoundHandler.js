"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = void 0;
const notFoundHandler = (req, res, next) => {
    const url = req.url;
    res.status(404).json({ error: `the ${url} not found` });
    next();
};
exports.notFoundHandler = notFoundHandler;
