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
exports.getStaff = void 0;
const user_1 = __importDefault(require("../models/user"));
const getStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { parentId } = req.params;
    try {
        const staff = yield user_1.default.find({ parentId: parentId });
        const owner = yield user_1.default.findById(parentId);
        if (!owner) {
            return res.status(500).json({ message: "No lake owner was found" });
        }
        staff.push(owner);
        return res.status(200).json(staff);
    }
    catch (_a) {
        return res.status(301).json({ message: "There were no staff found" });
    }
});
exports.getStaff = getStaff;
