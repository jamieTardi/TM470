"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAccessToken = (email) => {
    return jsonwebtoken_1.default.sign({ email }, process.env.TOKEN_SECRET, { expiresIn: "86400s" });
};
exports.generateAccessToken = generateAccessToken;
const validateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        return res.status(401);
    }
    jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403);
        }
        // @ts-ignore
        req.tokenData = decoded;
        next();
    });
};
exports.validateToken = validateToken;
