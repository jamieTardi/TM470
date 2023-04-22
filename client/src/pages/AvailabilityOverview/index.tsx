import React, { useState, useEffect, useCallback } from "react";
import { getAllBookingsForYear } from "../../Api/booking";
import { Loading, Tab, Tabs } from "../../components";
import Calendar from "react-calendar";
import { TYearDatesBooked } from "../../Types/booking";
import { RootState, useAppDispatch } from "../../Redux/store";
import { fetchLakes } from "../../Redux/slices/lakeSlice";
import { useSelector } from "react-redux";
import styles from "./availability.module.scss";
import YearSelection from "./YearSelection";
import { createSearchParams, useNavigate } from "react-router-dom";

const months = [
	{ month: "jan", monthNum: 0 },
	{ month: "feb", monthNum: 1 },
	{ month: "mar", monthNum: 2 },
	{ month: "apr", monthNum: 3 },
	{ month: "may", monthNum: 4 },
	{ month: "june", monthNum: 5 },
	{ month: "july", monthNum: 6 },
	{ month: "aug", monthNum: 7 },
	{ month: "sept", monthNum: 8 },
	{ month: "oct", monthNum: 9 },
	{ month: "nov", monthNum: 10 },
	{ month: "dec", monthNum: 11 },
];

type TReturnedDates = {
	date: string;
	places: number;
};

const AvailabilityOverview = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [returnedDates, setReturnedDates] = useState<TYearDatesBooked | undefined>();
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
	const user: IUser = useSelector<RootState>((state) => state.auth.user) as IUser;
	const lakesSelector = useSelector<RootState>((state) => state.lakes) as any;
	const lakes: TLake[] = lakesSelector.lakes;
	const [currentLake, setCurrentLake] = useState<null | TLake>(null);

	const handleSelection = (lake: TLake) => {
		setCurrentLake(lake);
	};

	const handleLinkToBookings = useCallback(
		(monthNum: number) => {
			navigate({
				pathname: "/bookings",
				search: createSearchParams({
					bookingDate: new Date(currentYear, monthNum, 5).toISOString(),
					lakeId: currentLake ? currentLake?._id : "",
				}).toString(),
			});
		},
		[currentLake, currentYear, navigate]
	);

	useEffect(() => {
		if (!user._id) {
			return;
		}
		dispatch(fetchLakes(user.parentId ? user.parentId : user._id));
	}, [dispatch, user]);

	useEffect(() => {
		if (!lakes) {
			return;
		}
		setCurrentLake(lakes[0]);
	}, [lakes]);

	useEffect(() => {
		if (!lakes || !currentLake?._id) {
			return;
		}
		getAllBookingsForYear(currentYear, currentLake._id, setReturnedDates);
	}, [lakes, currentYear, currentLake]);

	if (!returnedDates || !currentLake) {
		return <Loading />;
	}

	return (
		<div className={styles.availability}>
			<h1>Overview of bookings</h1>

			<Tabs className={styles.availability__tabs}>
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
			<YearSelection currentYear={currentYear} setCurrentYear={setCurrentYear} />
			<div className={styles.availability__calendar}>
				{months.map((month) => (
					<button key={month.monthNum} onClick={() => handleLinkToBookings(month.monthNum)}>
						<Calendar
							className="year"
							activeStartDate={new Date(currentYear, month.monthNum)}
							tileClassName={({ date }) => {
								if (
									// @ts-ignore
									returnedDates[month.month]?.find((x: TReturnedDates) => {
										return (
											date.getDay() === new Date(x.date).getDay() &&
											date.getMonth() === new Date(x.date).getMonth() &&
											date.getDate() === new Date(x.date).getDate() &&
											x.places === currentLake.maxUsers
										);
									})
								) {
									return "highlight-red";
								}
								if (
									// @ts-ignore
									returnedDates[month.month]?.find((x: TReturnedDates) => {
										return (
											date.getDay() === new Date(x.date).getDay() &&
											date.getMonth() === new Date(x.date).getMonth() &&
											date.getDate() === new Date(x.date).getDate() &&
											x.places < currentLake.maxUsers
										);
									})
								) {
									return "highlight-yellow";
								}
								return "highlight-green";
							}}
						/>
					</button>
				))}
			</div>
		</div>
	);
};

export default AvailabilityOverview;
