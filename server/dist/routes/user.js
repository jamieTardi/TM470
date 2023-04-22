"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get("/", user_1.getAllUsers);
router.post("/create-user", user_1.createUser);
router.get("/login", user_1.loginUser);
router.get("/auth/:email", auth_1.validateToken, user_1.getUser);
exports.default = router;
