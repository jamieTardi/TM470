import React, { useState, useCallback, useEffect } from 'react';
import { TAvailability, TBooking } from '../../../../../../Types/booking';
import { Input, Datepicker, Toast, Textarea, Checkbox } from '../../../../..';
import styles from './bookingInfo.module.scss';
import { getAvailability } from '../../../../../../Api/booking';
import { TResponseState } from '../../../../../../Types/general';
import BookingPlaces from '../BookingPlaces';

type TProps = {
	booking: TBooking;
	setBooking: React.Dispatch<React.SetStateAction<any>>;
	existingBooking: TBooking | undefined;
	isSendEmail: boolean;
	setIsSendEmail: React.Dispatch<React.SetStateAction<boolean>>;
};

const BookingInfo = ({
	booking,
	setBooking,
	isSendEmail,
	setIsSendEmail,
}: TProps) => {
	const [dateRange, setDateRange] = useState<any>([
		booking.arrival,
		booking.departure,
	]);
	const [response, setResponse] = useState<null | TResponseState>(null);
	const isNegativePrice = booking.cost - booking.paid < 0;
	const responseColour = response?.isError
		? 'red'
		: response?.isWarning
		? 'yellow'
		: 'green';

	const updateBooking = useCallback(() => {
		setBooking({
			...booking,
			arrival: new Date(dateRange[0].setHours(dateRange[0].getHours() + 6)),
			departure: new Date(dateRange[1].setHours(dateRange[1].getHours() - 6)),
		});
	}, [booking, dateRange, setBooking]);
	useEffect(() => {
		if (
			!booking.arrival ||
			!booking.departure ||
			!booking.customerId ||
			!booking.lakeId
		) {
			return;
		}
		const avaliableObj: TAvailability = {
			lakeId: booking.lakeId,
			arrival: booking.arrival,
			departure: booking.departure,
			placesBooked: booking.placesBooked,
			customerId: booking.customerId,
		};
		getAvailability(avaliableObj, setResponse);
	}, [
		booking.arrival,
		booking.departure,
		booking.placesBooked,
		booking.lakeId,
		booking.customerId,
	]);

	return (
		<div className={styles.bookingInfo}>
			<h3 className={styles.bookingInfo__title}>
				3. Add the Booking Date and Cost
			</h3>

			<div className={styles.bookingInfo__datePicker}>
				<h4>Current Dates Chosen</h4>
				<Datepicker
					dateRange={dateRange}
					setDateRange={setDateRange}
					onCalendarClose={updateBooking}
				/>
				{response && (
					<Toast colour={responseColour} textContent={response.message} />
				)}
			</div>
			<div className={styles.bookingInfo__inputs}>
				<Input
					title='Total cost (number only)'
					name='cost'
					type='number'
					currentValue={booking.cost}
					setValueUpdate={setBooking}
					valueUpdate={booking}
					required={true}
					className='input'
				/>

				<Input
					title={`Deposit payment (number only)`}
					type='number'
					name='paid'
					setValueUpdate={setBooking}
					currentValue={booking.paid}
					valueUpdate={booking}
					required={true}
					className='input'
				/>
			</div>
			<div>
				{isNegativePrice && (
					<Toast
						colour='red'
						textContent='The Deposit/Paid amount cannot be more than the total cost.'
					/>
				)}
			</div>
			<div>
				<BookingPlaces booking={booking} setBooking={setBooking} />
			</div>
			<div className={styles.bookingInfo__textarea}>
				<Textarea
					label='Notes (optional)'
					name='notes'
					setValueUpdate={setBooking}
					currentValue={booking.notes}
					valueUpdate={booking}
				/>
				<Checkbox
					label={`Tick to send a email upon placing this booking`}
					valueKey='isExclusive'
					handleCheckboxChange={() => {
						setIsSendEmail(!isSendEmail);
					}}
					defaultChecked={false}
				/>
			</div>
		</div>
	);
};

export default React.memo(BookingInfo);
