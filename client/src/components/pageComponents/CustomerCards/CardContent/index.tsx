import React from "react";
import { ICustomer } from "../../../../Types/customer";
import { CardBody } from "../../../";
import styles from "../customerCards.module.scss";

type TProps = {
	customer: ICustomer;
	className: string;
};

const CardContent = ({ customer, className }: TProps) => {
	return (
		<CardBody className={className}>
			<div className={styles["card__content--top"]}>
				<div className={styles.customerId}>
					<span className="bold">Customer unique ID: </span>
					<span>{customer._id}</span>
				</div>

				<div className="space-between">
					<div>
						<span className="bold">Phone: </span>
						<span>
							<a href={`tel:${customer.phone}`} className="underline">
								{customer.phone}
							</a>
						</span>
					</div>
					<div>
						<span className="bold">Email: </span>
						<span>
							<a href={`mailto:${customer.email}`} className="underline" target="_blank" rel="noopener noreferrer">
								{customer.email}
							</a>
						</span>
					</div>
				</div>
			</div>
			<div className={styles["content__content--middle"]}>
				<span className="bold">Home Location: </span>
				<span>
					Longtitude: {customer.location.gps[0]} Latitude: {customer.location.gps[1]}
				</span>
			</div>
			{customer.notes && (
				<div className={styles["content__content--end"]}>
					<span className="bold">Notes:</span>
					<p>{customer.notes}</p>
				</div>
			)}
		</CardBody>
	);
};

export default React.memo(CardContent);
