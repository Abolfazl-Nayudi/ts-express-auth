"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const mongo_config_1 = require("./config/mongo.config");
const auth_route_1 = require("./routes/auth.route");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const notFoundHandler_1 = require("./lib/notFoundHandler");
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('home page');
});
app.use('/auth', auth_route_1.router);
app.all('*', notFoundHandler_1.notFoundHandler);
const PORT = 4000;
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongo_config_1.connectDB)();
    app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
});
connect();
