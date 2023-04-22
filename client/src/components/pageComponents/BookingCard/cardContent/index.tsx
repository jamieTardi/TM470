import React, { useEffect, useState } from "react";
import { Button, CardBody, Pill, Icon } from "../../..";
import { TBooking } from "../../../../Types/booking";
import styles from "../bookingCard.module.scss";
import Pillcase from "../../../general/pillcase";
import { getSingleCustomer } from "../../../../Api/customers";
import { ICustomer } from "../../../../Types/customer";
import InnerContent from "./innerContent";
import { differenceInCalendarDays } from "date-fns";

type TProps = {
	className: string;
	booking: TBooking;
	hasPaid: boolean;
	lake: TLake;
};

const CardContent = ({ className, booking, hasPaid, lake }: TProps) => {
	const [customer, setCustomer] = useState<null | ICustomer>(null);
	const [isWholeCard, setIsWholeCard] = useState(false);
	const { emailsSent, bookingEmailSent } = booking;
	const arrivingInDays = differenceInCalendarDays(new Date(booking.arrival!), new Date());
	const arrivalString = arrivingInDays > 0 ? `${arrivingInDays} days from now` : `Arriving today`;

	const isExclusive = booking.placesBooked === lake.maxUsers;

	useEffect(() => {
		getSingleCustomer(booking.customerId, setCustomer);
	}, [booking.customerId]);

	return (
		<CardBody className={className}>
			<div className={styles["card__content--top"]}>
				<div className={styles["card__content--pills"]}>
					<h4>{lake.name}</h4>
					<Pillcase>
						<Pill value={hasPaid ? "success" : "high"}>{hasPaid ? "Paid in Full" : "Not Paid"}</Pill>
						<Pill value={bookingEmailSent ? "success" : "medium"} colour="red">
							{bookingEmailSent ? `Booking emails sent: ${bookingEmailSent}` : "No booking emails sent"}
						</Pill>
						<Pill value={emailsSent ? "success" : "medium"} colour="red">
							{emailsSent ? `Payment emails sent: ${emailsSent}` : "No payment emails sent"}
						</Pill>
						<Pill value="low" colour="red">
							{isExclusive ? `Lake Exclusive` : "Individual Booking"}
						</Pill>
					</Pillcase>
				</div>

				<div className={styles.customerId}>
					<span className="bold">Booking Reference: </span>
					<span>{booking.refNo}</span>
				</div>

				<div className={styles.customerId}>
					<span className="bold">Customer arriving in: </span>
					<span>{arrivingInDays < 0 ? "Date has passed" : arrivalString}</span>
				</div>

				<div className={styles.topContainer}>
					<div className={styles.top}>
						<div className={styles.top__inputs}>
							<div className={styles.inner_content}>
								<span className="bold">Customer: </span>
								{customer?.firstName} {customer?.nickName && `"${customer?.nickName}"`} {customer?.lastName}
							</div>
							<div className={styles.inner_content}>
								<span className="bold">Phone: </span>
								<a href={`tel:${customer?.phone}`} className="underline">
									<Icon type="phone" size="small" colour="blue" />
									{customer?.phone}
								</a>
							</div>
						</div>
						{customer && isWholeCard && <InnerContent customer={customer} booking={booking} />}
					</div>

					<Button
						icon={isWholeCard ? "up-arrow" : "down-arrow"}
						variant="success"
						onClick={() => {
							setIsWholeCard(!isWholeCard);
						}}
					>
						{isWholeCard ? "See Less" : "See More"}
					</Button>
				</div>
			</div>
		</CardBody>
	);
};

export default React.memo(CardContent);
