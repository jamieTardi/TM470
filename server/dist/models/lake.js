"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const lakesSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    maxUsers: { type: Number, required: true },
    depth: { type: Number, required: true },
    ownerId: { type: String, required: true },
    assignedUsersId: { type: Array, required: true },
    lakeRef: { type: String, required: true },
    email: { type: String, required: true },
    website: { type: String },
    specifics: {
        hasFood: { type: Boolean, required: true },
        allowsDogs: { type: Boolean, required: true },
        allowsFires: { type: Boolean, required: true },
        allowsSwimParking: { type: Boolean, required: true },
        allowsOwnBait: { type: Boolean, required: true },
        hasWifi: { type: Boolean, required: true },
        allowsIndividualBookings: { type: Boolean, required: true },
        hasSlings: { type: Boolean, required: true },
        hasMerchandise: { type: Boolean, required: true },
        hasShowers: { type: Boolean, required: true },
        toiletsProvided: { type: Boolean, required: true },
        hasBaliff: { type: Boolean, required: true },
        allowsBBQ: { type: Boolean, required: true },
    },
    location: {
        gps: { type: Array, required: true },
    },
});
exports.default = mongoose_1.default.model("Lakes", lakesSchema);
