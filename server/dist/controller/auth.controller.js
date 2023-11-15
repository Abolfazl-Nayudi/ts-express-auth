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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const User_model_1 = require("../model/User.model");
const authUtils_1 = require("../lib/authUtils");
const { TOKEN_NAME, REFRESH_TOKEN, ACCESS_TOKEN } = process.env;
class AuthController {
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const existingUser = yield User_model_1.User.findOne({ email: email });
            if (existingUser) {
                return res
                    .status(400)
                    .json({ success: false, message: 'the user already exists', data: '' });
            }
            const newUser = yield User_model_1.User.create({
                email,
                password: authUtils_1.AuthUtils.hassPassword(password),
            });
            res.status(201).json({
                sucess: true,
                message: 'account created successfully',
                data: newUser,
            });
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const user = yield User_model_1.User.findOne({ email });
                if (!user) {
                    return res.status(400).json({
                        success: false,
                        message: 'email or password incorrect',
                        data: '',
                    });
                }
                const checkPassword = authUtils_1.AuthUtils.comparePassword(password, user.password);
                if (!checkPassword) {
                    return res.status(403).json({
                        success: false,
                        message: 'email or password incorrect',
                        data: '',
                    });
                }
                const accessToken = authUtils_1.AuthUtils.createAccessToken(user.email);
                const refreshToken = authUtils_1.AuthUtils.createRefreshToken(user.email);
                user.token = refreshToken;
                user.save();
                authUtils_1.AuthUtils.sendRefreshToken(req, res, refreshToken);
                authUtils_1.AuthUtils.sendAccessToken(req, res, accessToken);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    static logout(req, res) {
        res.clearCookie(TOKEN_NAME, {
            path: '/refresh',
        });
        res
            .status(200)
            .json({ success: true, message: 'logout successfully', data: '' });
    }
    static refresh(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.cookies[`${TOKEN_NAME}`];
            console.log(token);
            if (!token) {
                return res
                    .status(401)
                    .json({ success: false, message: 'unathenticated', data: '' });
            }
            const payload = authUtils_1.AuthUtils.verifyUser(token, REFRESH_TOKEN);
            const user = yield User_model_1.User.findOne({ email: payload });
            if (!user) {
                return res
                    .status(401)
                    .json({ success: false, message: 'unathenticated', data: '' });
            }
            if (user.token !== token) {
                return res
                    .status(401)
                    .json({ success: false, message: 'unathenticated', data: '' });
            }
            const accessToken = authUtils_1.AuthUtils.createAccessToken(user.email);
            const refreshToken = authUtils_1.AuthUtils.createRefreshToken(user.email);
            user.token = refreshToken;
            user.save();
            authUtils_1.AuthUtils.sendRefreshToken(req, res, refreshToken);
            authUtils_1.AuthUtils.sendAccessToken(req, res, accessToken);
        });
    }
}
exports.AuthController = AuthController;
