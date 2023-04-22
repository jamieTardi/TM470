"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNo: { type: String, required: true },
    createdOn: { type: Date, required: true },
    parentId: { type: String },
    lastLogin: { type: Date },
    paymentDetails: {
        sortCode: { type: String },
        accNumber: { type: String },
    },
    subscriptionStatus: {
        isSubscribed: { type: Boolean, default: true },
        subscriptionType: {
            type: String,
            default: "basic",
            enum: ["complex", "premium", "basic"],
        },
    },
    role: {
        type: String,
        default: "baliff",
        enum: ["admin", "owner", "baliff"],
    },
    myLakes: { type: Array, required: true },
});
exports.default = mongoose_1.default.model("User", userSchema);
