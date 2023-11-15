"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, 'please enter an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'please enter a password'],
        minlength: [5, 'the minimum number of character is 5'],
    },
    token: {
        type: String,
        default: null,
    },
});
const User = (0, mongoose_1.model)('user-model', UserSchema);
exports.User = User;
