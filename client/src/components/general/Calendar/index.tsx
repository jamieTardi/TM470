import React, { useCallback } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { TDatesBooked } from "../../../Types/booking";
import styles from "./calendar.module.scss";

type TProps = {
	className?: string;
	showNeighboringMonth?: boolean;
	dates?: TDatesBooked[];
	isFirstOfMonth?: boolean;
};

type TFormattedDates = {
	date: Date;
	placesAvailable?: number;
};

const CalendarComponent = ({ className, showNeighboringMonth = true, dates }: TProps) => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const bookingDate = searchParams.get("bookingDate");
	const startDate = bookingDate ? new Date(bookingDate) : new Date();
	const lakeId = searchParams.get("lakeId");

	const handleNewDate = useCallback(
		(newDate: Date) => {
			const date = new Date(newDate.setDate(newDate.getDate() + 5)).toISOString();
			navigate({
				pathname: "",
				search: createSearchParams({
					bookingDate: `${date}`,
					lakeId: lakeId ? lakeId : "",
				}).toString(),
			});
		},
		[navigate, lakeId]
	);

	const formattedDates: TFormattedDates[] | undefined = dates
		?.map((el) => {
			return el.dateRange.map((date) => {
				return { date: date, placesAvailable: el?.placesAvailable };
			});
		})
		.flat();

	// const nonExclusiveDates = dates?.filter((date) => date.placesAvailable !== 0);
	// const placesBooked = nonExclusiveDates?.reduce((sum, date) => sum + date.placesAvailable!, 0);

	return (
		<div className={styles.calendar}>
			<Calendar
				defaultActiveStartDate={startDate}
				showNeighboringMonth={showNeighboringMonth}
				className={className}
				onActiveStartDateChange={({ activeStartDate }) => handleNewDate(activeStartDate)}
				tileClassName={({ date }) => {
					if (
						formattedDates?.find((x: TFormattedDates) => {
							return (
								date.getDay() === new Date(x.date).getDay() &&
								date.getMonth() === new Date(x.date).getMonth() &&
								date.getDate() === new Date(x.date).getDate() &&
								!x.placesAvailable
							);
						})
					) {
						return "highlight-red";
					}
					if (
						formattedDates?.find((x: TFormattedDates) => {
							return (
								date.getDay() === new Date(x.date).getDay() &&
								date.getMonth() === new Date(x.date).getMonth() &&
								date.getDate() === new Date(x.date).getDate() &&
								x.placesAvailable
							);
						})
					) {
						return "highlight-yellow";
					}
					return "highlight-green";
				}}
			/>
			{/* <p>There are {placesBooked} Places booked</p> */}
		</div>
	);
};

export default React.memo(CalendarComponent);
