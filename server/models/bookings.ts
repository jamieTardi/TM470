import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
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

export default mongoose.model("Bookings", bookingSchema);
