"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookings_1 = require("../controllers/bookings");
const router = express_1.default.Router();
router.patch("/edit", bookings_1.updateBooking);
router.get("/:date", bookings_1.getBookings);
router.post("/create", bookings_1.createBooking);
router.post("/availability", bookings_1.checkAvailability);
router.post("/email/send-info", bookings_1.sendInfoEmail);
router.get("/get-all/:year/:lakeId", bookings_1.getAllBookingsForYear);
exports.default = router;
