import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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

export default mongoose.model("User", userSchema);
