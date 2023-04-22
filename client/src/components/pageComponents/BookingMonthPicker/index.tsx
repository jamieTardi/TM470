import React from "react";
import Calendar from "../../general/Calendar";
import styles from "./bookingMonthPicker.module.scss";

type Props = {};

const BookingMonthPicker = (props: Props) => {
	return (
		<div className={styles.bookingMonthPicker}>
			<Calendar className="month" />
		</div>
	);
};

export default BookingMonthPicker;
