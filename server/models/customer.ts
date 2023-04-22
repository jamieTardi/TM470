import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
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

export default mongoose.model("Customers", customerSchema);
