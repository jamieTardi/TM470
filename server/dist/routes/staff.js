"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const staff_1 = require("../controllers/staff");
const router = express_1.default.Router();
router.get("/:parentId", staff_1.getStaff);
exports.default = router;
