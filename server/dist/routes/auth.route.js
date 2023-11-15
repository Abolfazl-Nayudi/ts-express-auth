"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_validate_1 = require("../validation/auth.validate");
const auth_controller_1 = require("../controller/auth.controller");
const router = (0, express_1.Router)();
exports.router = router;
router
    .route('/register')
    .post(auth_validate_1.ValidationMiddleware.registerUser, auth_controller_1.AuthController.register);
router
    .route('/login')
    .post(auth_validate_1.ValidationMiddleware.registerUser, auth_controller_1.AuthController.login);
router
    .route('/refresh')
    .post(auth_validate_1.ValidationMiddleware.registerUser, auth_controller_1.AuthController.refresh);
