export interface ICustomer {
	firstName: string;
	lastName: string;
	nickName?: string;
	phone: string;
	email: string;
	bookingHistory?: TBookingHistory;
	location: TLocation;
}

type TBookingHistory = {
	lastBookingDate?: Date;
	previousBookings?: string[];
	totalSpend?: number;
	lakesBookedOn?: string[];
	tripsInPastYear?: number;
};
