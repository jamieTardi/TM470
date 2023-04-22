import { ICustomer } from "./customer";

export interface IBooking {
	bookingDetails: TBooking;
	customer: ICustomer;
	lake: TLake;
}

type TBooking = {
	_id?: string;
	arrival: Date | null;
	departure: Date | null;
	cost: number;
	paid: number;
	placesBooked: number;
	datesBooked?: TDatesBooked;
	customerId: string;
	lakeId: string;
	emailsSent?: number;
	bookingEmailSent: number;
	refNo?: string;
	notes?: string;
};

export type TAvailability = {
	arrival: Date;
	departure: Date;
	placesBooked: number;
	lakeId: string;
	customerId: string;
};

export type TDatesBooked = {
	dateRange: Date[];
	placesAvailable?: number;
};

export type TYearDatesBooked = {
	jan: string[];
	feb: string[];
	mar: string[];
	apr: string[];
	may: string[];
	june: string[];
	july: string[];
	aug: string[];
	sept: string[];
	oct: string[];
	nov: string[];
	dec: string[];
};
