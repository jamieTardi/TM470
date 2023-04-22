import express from "express";

import {
	createBooking,
	getBookings,
	updateBooking,
	checkAvailability,
	sendInfoEmail,
	getAllBookingsForYear,
} from "../controllers/bookings";

const router = express.Router();

router.patch("/edit", updateBooking);
router.get("/:date", getBookings);
router.post("/create", createBooking);
router.post("/availability", checkAvailability);
router.post("/email/send-info", sendInfoEmail);
router.get("/get-all/:year/:lakeId", getAllBookingsForYear);

export default router;
