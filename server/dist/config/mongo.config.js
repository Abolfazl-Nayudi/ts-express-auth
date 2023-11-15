"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { DB_NAME, DB_URI } = process.env;
const connectDB = () => {
    mongoose_1.default
        .connect(`${DB_URI}/${DB_NAME}`)
        .then(() => console.log('connected to database successfully'))
        .catch((err) => {
        console.log(`ERROR: could not connect to mongodb ${err}`);
    });
};
exports.connectDB = connectDB;
