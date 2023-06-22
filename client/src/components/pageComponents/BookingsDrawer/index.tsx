import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Drawer, DrawerHeader, Modal } from '../../';
import Footer from './Content/BookingDetails/Footer';
import Content from './Content';
import { TBooking } from '../../../Types/booking';
import { defaultBookingState } from '../../../state/booking';
import { createBooking, updateBooking } from '../../../Api/booking';
import { fetchBookings } from '../../../Redux/slices/bookingsSlice';
import { RootState, useAppDispatch } from '../../../Redux/store';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

const BookingsDrawer = () => {
	const [showModal, setShowModal] = useState(false);
	const [isSendEmail, setIsSendEmail] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();
	const [isLoading, setIsLoading] = useState(false);
	const currentBookings: TBooking[] = useSelector<RootState>(
		(state) => state.bookingsState.bookings,
	) as TBooking[];
	const currentUser: IUser = useSelector<RootState>(
		(state) => state.auth.user,
	) as IUser;
	const bookingId = searchParams.get('bookingId');
	const existingBooking: TBooking | undefined = currentBookings
		? currentBookings.filter(
				(booking: TBooking) => booking._id === bookingId,
		  )[0]
		: undefined;
	const [booking, setBooking] = useState<TBooking>(defaultBookingState);
	const dispatch = useAppDispatch();
	const arrival = format(new Date(booking.arrival), 'do MMMM yyyy');
	const isNegativePrice = booking.cost - booking.paid < 0;
	const isDisabled =
		!booking.arrival ||
		!booking.departure ||
		!booking.customerId ||
		!booking.lakeId ||
		!booking.cost ||
		!booking.placesBooked;

	const handleClearParams = useCallback(() => {
		searchParams.delete('bookingId');
		setSearchParams(searchParams);
	}, [searchParams, setSearchParams]);

	const handleClearLoading = useCallback(() => {
		setTimeout(() => {
			setIsLoading(false);
			handleClearParams();
			dispatch(fetchBookings(new Date(booking.arrival!).toISOString()));
		}, 1700);
	}, [handleClearParams, booking.arrival, dispatch]);
	const handleSendForm = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			setIsLoading(true);

			if (!existingBooking) {
				createBooking(
					booking,
					handleClearLoading,
					isSendEmail,
					currentUser._id!,
				);
				return;
			}
			updateBooking(booking, handleClearLoading);
		},
		[booking, existingBooking, handleClearLoading, isSendEmail, currentUser],
	);

	const handleDelete = useCallback(() => {
		setIsLoading(true);
		// deleteBooking(booking._id!, handleClearLoading);
	}, []);

	useEffect(() => {
		if (!existingBooking) {
			return;
		}
		setBooking(existingBooking);
	}, [existingBooking, currentBookings]);

	return (
		<form onSubmit={(e) => handleSendForm(e)}>
			<Drawer>
				<DrawerHeader handleClose={handleClearParams}>
					{existingBooking
						? `Edit booking for ${arrival}`
						: 'Create a new booking'}
				</DrawerHeader>
				<Content
					booking={booking}
					setBooking={setBooking}
					existingBooking={existingBooking}
					isSendEmail={isSendEmail}
					setIsSendEmail={setIsSendEmail}
				/>
				<Footer
					setShowModal={setShowModal}
					existingBooking={!!existingBooking}
					loading={isLoading}
					handleClearParams={handleClearParams}
					isDisabled={isDisabled}
					isNegativePrice={isNegativePrice}
				/>
				{showModal && (
					<Modal
						title={`Delete booking for ${arrival}?`}
						handleClose={() => setShowModal(false)}
						buttonTxt='Delete'
						loading={isLoading}
						handleChange={handleDelete}>
						Are you Sure you want to delete this booking? This will{' '}
						<span className='bold'>PERMANENTLY</span> delete this booking and
						all of their associated information?
					</Modal>
				)}
			</Drawer>
		</form>
	);
};

export default React.memo(BookingsDrawer);
