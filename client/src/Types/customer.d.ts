export interface ICustomer {
	_id?: string;
	firstName: string;
	lastName: string;
	nickName?: string;
	phone: string;
	email: string;
	assignedUsersId: string[];
	notes?: string;
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

type TFilter = {
	id: string;
	filter: string;
	filterBy: string;
};
