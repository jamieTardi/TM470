import axios from "axios";
import { BASEURL } from "../constants";
import { TAvailability, TBooking, TYearDatesBooked } from "../Types/booking";

const api = axios.create({ baseURL: BASEURL });

export const createBooking = (
	booking: TBooking,
	handleClearLoading: Function,
	isSendEmail: boolean,
	userId: string
) => {
	api
		.post("/bookings/create", { booking, isSendEmail, userId })
		.then(() => handleClearLoading())
		.catch((err) => {
			handleClearLoading();
			alert(err);
		});
};

export const updateBooking = (booking: TBooking, handleClearLoading: Function) => {
	api
		.patch("/bookings/edit", booking)
		.then(() => handleClearLoading())
		.catch((err) => {
			handleClearLoading();
			alert(err);
		});
};

export const getAvailability = (
	availability: TAvailability,
	setResponse: React.Dispatch<React.SetStateAction<any>>
) => {
	api
		.post(`/bookings/availability`, availability)
		.then((res) => setResponse({ message: res.data.message, isError: false, isWarning: res.data.warning }))
		.catch((err) => setResponse({ message: err.response.data.message, isError: true }));
};

export const emailBooking = (
	booking: TBooking,
	handleClearLoading: Function,
	setResponse: React.Dispatch<React.SetStateAction<any>>,
	userId: string
) => {
	api
		.post("/bookings/email/send-info", { booking, userId })
		.then((res) => {
			setResponse({ message: res.data, isError: false });
			handleClearLoading();
		})
		.catch((err) => {
			handleClearLoading();
			setResponse({ message: err.response.data.message, isError: true });
		});
};

export const getAllBookingsForYear = (
	year: number,
	lakeId: string,
	setReturnedDates: React.Dispatch<React.SetStateAction<TYearDatesBooked | undefined>>
) => {
	api
		.get(`/bookings/get-all/${year}/${lakeId}`)
		.then((res) => setReturnedDates(res.data))
		.catch((err) => console.log(err));
};
