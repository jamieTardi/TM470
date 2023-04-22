"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const customerSchema = new mongoose_1.default.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    nickName: { type: String },
    phone: { type: String, required: true },
    createdOn: { type: Date, required: true },
    assignedUsersId: { type: [String], required: true },
    notes: { type: String },
    bookingHistory: {
        lastBookingDate: { type: Date },
        previousBookings: { type: Array },
        totalSpend: { type: Number },
        previousNumberTrips: { type: Number },
    },
    location: {
        gps: { type: Array, required: true },
    },
});
exports.default = mongoose_1.default.model("Customers", customerSchema);
