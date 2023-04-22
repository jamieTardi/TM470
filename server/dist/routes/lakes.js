"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lakes_1 = require("../controllers/lakes");
const router = express_1.default.Router();
router.delete("/delete/:lakeId", lakes_1.deleteLake);
router.patch("/update/:lakeId", lakes_1.updateLakes);
router.post("/create", lakes_1.createLake);
router.get("/:userId", lakes_1.getLakes);
exports.default = router;
