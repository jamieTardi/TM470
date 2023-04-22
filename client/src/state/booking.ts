import { TBooking } from "../Types/booking";

export const defaultBookingState: TBooking = {
	arrival: null,
	departure: null,
	cost: 0,
	paid: 0,
	placesBooked: 0,
	bookingEmailSent: 0,
	customerId: "",
	lakeId: "",
};
