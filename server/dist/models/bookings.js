"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookingSchema = new mongoose_1.default.Schema({
    arrival: { type: Date, required: true },
    departure: { type: Date, required: true },
    cost: { type: Number, required: true },
    paid: { type: Number, required: true },
    refNo: { type: String, required: true },
    emailsSent: { type: Number, required: true },
    placesBooked: { type: Number, required: true },
    bookingEmailSent: { type: Number },
    datesBooked: { type: Array, required: true },
    customerId: { type: String, required: true },
    lakeId: { type: String, required: true },
    createdOn: { type: Date, required: true },
    notes: { type: String },
});
exports.default = mongoose_1.default.model("Bookings", bookingSchema);
