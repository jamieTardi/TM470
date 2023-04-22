import React from "react";
import BookingCard from "../../../components/pageComponents/BookingCard";
import { TBooking } from "../../../Types/booking";
import { eachDayOfInterval } from "date-fns";
import { motion } from "framer-motion";
import styles from "./bookingData.module.scss";
import Calendar from "../../../components/general/Calendar";
import cx from "classnames";
import { Empty } from "../../../components";

type TProps = {
	bookings: TBooking[];
	lake: TLake;
};

const BookingData = ({ bookings, lake }: TProps) => {
	const filiteredBookings = bookings.filter((aBooking) => aBooking.lakeId === lake._id);
	const isFirstOfMonth = new Date(filiteredBookings[0]?.arrival!).getDate() === 1;

	const dates = filiteredBookings.map((aBooking) => {
		return {
			dateRange: eachDayOfInterval({
				start: new Date(aBooking.arrival!),
				end: new Date(aBooking.departure!),
			}),
			placesAvailable: lake.maxUsers - aBooking.placesBooked,
		};
	});

	if (!filiteredBookings.length) {
		return <Empty title="There are no bookings currently for this month" />;
	}
	return (
		<>
			<Calendar
				showNeighboringMonth={false}
				dates={dates}
				className={cx(styles.bookingData__calendar)}
				isFirstOfMonth={isFirstOfMonth}
			/>
			<div className={styles.bookingData__cards}>
				{filiteredBookings
					.sort((a, b) => new Date(b.arrival!).getDay() - new Date(a.arrival!).getDay())
					.map((aBooking, i) => (
						<motion.div
							transition={{ duration: 0.35 }}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							key={aBooking._id}
							className={styles.bookingData}
						>
							<BookingCard booking={aBooking} lake={lake} />
						</motion.div>
					))}
			</div>
		</>
	);
};

export default React.memo(BookingData);
