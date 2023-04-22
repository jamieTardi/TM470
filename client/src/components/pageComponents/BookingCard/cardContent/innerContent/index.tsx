import { format } from "date-fns";
import React from "react";
import { TBooking } from "../../../../../Types/booking";
import { ICustomer } from "../../../../../Types/customer";
import styles from "../../bookingCard.module.scss";
import CardFooter from "../../CardFooter";
import { motion } from "framer-motion";

type TProps = {
	customer: ICustomer;
	booking: TBooking;
};

const InnerContent = ({ customer, booking }: TProps) => {
	const arrival = format(new Date(booking.arrival!), "eeee do MMMM yyyy");
	const depart = format(new Date(booking.departure!), "eeee do MMMM yyyy");
	return (
		<motion.div
			transition={{ duration: 0.5 }}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className={styles.innerContentComponent}
		>
			<div className={styles.inner_top}>
				<div className={styles.inner_content}>
					<span className="bold">Arrival: </span>
					<div> {arrival}</div>
				</div>
				<div>
					<span className="bold">Departure: </span>
					<div>{depart}</div>
				</div>
			</div>

			<div className={styles.inner_top}>
				<div className={styles.inner_content}>
					<span className="bold">Email: </span>
					<a
						href={`mailto:${customer?.email}`}
						className="underline ellipsis"
						target="_blank"
						rel="noopener noreferrer"
					>
						{customer?.email}
					</a>
				</div>
				<div>
					<span className="bold">Customer ID: </span>
					<a
						href={`/customers?customerId=${customer?._id}`}
						title="View customer details"
						className="underline ellipsis"
					>
						{customer?._id}
					</a>
				</div>
			</div>
			<div className={styles.inner_top}>
				<div className={styles.inner_content}>
					<span className="bold">Number booked on: </span>
					{booking.placesBooked}
				</div>
			</div>
			<div className={styles.notes}>
				<span className="bold">Notes about this booking:</span>
				<p>{booking.notes ? booking.notes : "There are no notes for this booking currently."}</p>
			</div>
			<CardFooter booking={booking} />
		</motion.div>
	);
};

export default React.memo(InnerContent);
