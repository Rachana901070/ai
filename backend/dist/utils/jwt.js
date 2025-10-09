"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signToken = signToken;
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
function signToken(payload, expiresIn = '7d') {
    const options = { expiresIn };
    return (0, jsonwebtoken_1.sign)(payload, JWT_SECRET, options);
}
function verifyToken(token) {
    return (0, jsonwebtoken_1.verify)(token, JWT_SECRET);
}
