import DateTimeRangePicker from "@wojtekmaj/react-daterange-picker";
import React from "react";
import cx from "classnames";
import Icon from "../../icon";

type TProps = {
	dateRange: Date[];
	setDateRange: any;
	className?: string;
	onCalendarClose: any;
	isCalendarOpen?: boolean;
};

const DatePicker = ({ dateRange, setDateRange, className, onCalendarClose, isCalendarOpen = true }: TProps) => {
	return (
		<section className={cx("dateRangePicker", className, { open: isCalendarOpen })}>
			<DateTimeRangePicker
				locale="en-GB"
				onChange={setDateRange}
				value={dateRange}
				isOpen={false}
				onCalendarClose={onCalendarClose}
				closeCalendar={false}
				showLeadingZeros={true}
				minDate={new Date()}
				rangeDivider="---"
				calendarIcon={<Icon type="bookings" size="small" />}
			/>
		</section>
	);
};

export default React.memo(DatePicker);
