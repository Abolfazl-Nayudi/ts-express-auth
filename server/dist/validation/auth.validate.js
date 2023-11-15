"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationMiddleware = void 0;
const joi_1 = __importDefault(require("joi"));
class ValidationMiddleware {
    static registerUser(req, res, next) {
        const schema = joi_1.default.object({
            email: joi_1.default.string().email().required(),
            password: joi_1.default.string().min(5).required(),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            res.status(400).json({ error: error.details[0].message });
        }
        next();
    }
}
exports.ValidationMiddleware = ValidationMiddleware;
