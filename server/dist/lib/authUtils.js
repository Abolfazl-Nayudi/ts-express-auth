"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUtils = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const { ACCESS_TOKEN, REFRESH_TOKEN, TOKEN_NAME } = process.env;
class AuthUtils {
    static hassPassword(password) {
        const salt = (0, bcrypt_1.genSaltSync)();
        return (0, bcrypt_1.hashSync)(password, salt);
    }
    static comparePassword(password, hash) {
        return (0, bcrypt_1.compareSync)(password, hash);
    }
    static createAccessToken(email) {
        return (0, jsonwebtoken_1.sign)({ email }, ACCESS_TOKEN, { expiresIn: '15min' });
    }
    static createRefreshToken(email) {
        return (0, jsonwebtoken_1.sign)({ email }, REFRESH_TOKEN, { expiresIn: '1d' });
    }
    static sendAccessToken(req, res, accessToken) {
        return res.status(200).json({ token: accessToken });
    }
    static sendRefreshToken(req, res, refreshToken) {
        return res.cookie(TOKEN_NAME, refreshToken, {
            httpOnly: true,
            path: '/refresh',
        });
    }
    static verifyUser(token, secret) {
        try {
            const decoded = (0, jsonwebtoken_1.verify)(token, secret);
            return decoded.email;
        }
        catch (err) {
            return null;
        }
    }
}
exports.AuthUtils = AuthUtils;
