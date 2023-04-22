import React from "react";
import { TBooking } from "../../../Types/booking";
import { Button, Card, CardHeader } from "../../";
import styles from "./bookingCard.module.scss";
import { format } from "date-fns";
import CardContent from "./cardContent";
import cx from "classnames";
import { createSearchParams, useNavigate } from "react-router-dom";

type TProps = {
	booking: TBooking;
	lake: TLake;
};

const BookingCards = ({ booking, lake }: TProps) => {
	const { cost, paid } = booking;
	const hasPaid = cost - paid === 0;
	const arrivalTitle = format(new Date(booking.arrival!), "do MMMM yyyy");
	const navigate = useNavigate();
	const isExclusive = booking.placesBooked === lake.maxUsers;

	const handleNavigate = (id: string) => {
		const date = new Date(booking.arrival!).toISOString();
		navigate({
			pathname: "",
			search: createSearchParams({
				bookingDate: date,
				bookingId: id,
			}).toString(),
		});
	};

	return (
		<Card className={cx(styles.card)} scale={1.01}>
			<CardHeader
				className={cx(styles.card__cardHeader, { [styles.noPay]: !hasPaid }, { [styles.individual]: !isExclusive })}
			>
				<h3>Booking for {arrivalTitle}</h3>
				<Button icon="open" variant="clear" onClick={() => handleNavigate(`${booking._id}`)}>
					Open
				</Button>
			</CardHeader>
			<CardContent className={styles.card__content} booking={booking} hasPaid={hasPaid} lake={lake} />
		</Card>
	);
};

export default React.memo(BookingCards);
