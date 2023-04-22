import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { Tooltip, Button, Icon, Tabs, Tab, Loading } from "../../components";
import BookingMonthPicker from "../../components/pageComponents/BookingMonthPicker";
import BookingDrawer from "../../components/pageComponents/BookingsDrawer";
import { fetchBookings } from "../../Redux/slices/bookingsSlice";
import { fetchLakes } from "../../Redux/slices/lakeSlice";
import { RootState, useAppDispatch } from "../../Redux/store";
import { TBooking } from "../../Types/booking";
import BookingData from "./BookingData";
import styles from "./bookings.module.scss";

const Bookings = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const bookingId = searchParams.get("bookingId");
	const bookingDate = searchParams.get("bookingDate");
	const lakeId = searchParams.get("lakeId");
	const dispatch = useAppDispatch();
	const bookings: TBooking[] = useSelector<RootState>((state) => state.bookingsState.bookings) as TBooking[];
	const user: IUser = useSelector<RootState>((state) => state.auth.user) as IUser;
	const lakeSelector = useSelector<RootState>((state) => state.lakes) as any;
	const lakes: TLake[] = lakeSelector.lakes;
	const [currentLake, setCurrentLake] = useState<TLake | null>(null);

	const handleNewBooking = useCallback(() => {
		navigate({
			pathname: "",
			search: createSearchParams({
				bookingId: "new",
				bookingDate: bookingDate ? bookingDate : "",
				lakeId: currentLake?._id!,
			}).toString(),
		});
	}, [navigate, bookingDate, currentLake?._id]);

	useEffect(() => {
		if (!user._id) {
			return;
		}
		const date = new Date().toISOString();
		dispatch(fetchLakes(user.parentId ? user.parentId : user._id));
		if (!bookingDate) {
			dispatch(fetchBookings(date));
			return;
		}
		dispatch(fetchBookings(bookingDate));
	}, [bookingDate, dispatch, user]);

	useEffect(() => {
		if (!lakes) {
			return;
		}
		if (!lakeId) {
			setCurrentLake(lakes[0]);
			return;
		}
		const filiteredLake = lakes.filter((lake) => lake._id === lakeId)[0];
		setCurrentLake(filiteredLake);
	}, [lakes, lakeId]);

	const handleSelection = (lake: TLake) => {
		setCurrentLake(lake);
		navigate({
			pathname: "",
			search: createSearchParams({
				lakeId: lake._id,
				bookingDate: bookingDate ? bookingDate : "",
			}).toString(),
		});
	};

	if (!lakes) {
		return <Loading />;
	}

	return (
		<main className={styles.bookings}>
			<div className={styles.bookings__top}>
				<h1>Bookings</h1>
				<Tooltip direction="left" content="Add a new booking">
					<Button variant="success" onClick={handleNewBooking}>
						<Icon type="plus" size="x-large" />
					</Button>
				</Tooltip>
			</div>

			<BookingMonthPicker />
			<Tabs>
				{lakes &&
					lakes.map((lake, i) => (
						<React.Fragment key={lake._id}>
							<Tab
								start={i === 0}
								end={i === lakes.length - 1}
								handleSelection={() => handleSelection(lake)}
								tabId={lake._id}
								selectedId={currentLake?._id}
							>
								{lake.name}
							</Tab>
						</React.Fragment>
					))}
			</Tabs>
			{currentLake && bookings && <BookingData lake={currentLake} bookings={bookings} />}
			{bookingId && (
				<>
					<div className="overlay" />
					<BookingDrawer />
				</>
			)}
		</main>
	);
};

export default React.memo(Bookings);
