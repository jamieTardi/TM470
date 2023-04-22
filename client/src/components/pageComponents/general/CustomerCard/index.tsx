import React from "react";
import { ICustomer } from "../../../../Types/customer";
import { Card, CardBody, CardHeader } from "../../..";
import styles from "./customerCard.module.scss";
import Icon from "../../../icon";

type TProps = {
	customer: ICustomer;
	handleRemove: React.MouseEventHandler<HTMLButtonElement>;
};

const CustomerCard = ({ customer, handleRemove }: TProps) => {
	return (
		<Card className={styles.customerCard}>
			<CardHeader className={styles.customerCard__header}>
				<h3>
					{customer.firstName} {customer.nickName && `"${customer.nickName}"`} {customer.lastName}
				</h3>
				<button onClick={handleRemove} title="Click to remove customer">
					<Icon type="close" />
				</button>
			</CardHeader>
			<CardBody className={styles.customerCard__body}>
				<div>
					<span className="bold">Email: </span>
					<a
						href={`mailto:${customer.email}`}
						target="_blank"
						rel="noopener noreferrer"
						title="Click to email customer"
					>
						{customer.email}
					</a>
				</div>
				<div>
					<span className="bold">Phone: </span>
					<a href={`tel:${customer.phone}`} title="Click to phone customer">
						{customer.phone}
					</a>
				</div>
				<div>
					<span className="bold">Notes: </span>
					{customer.notes}
				</div>
			</CardBody>
		</Card>
	);
};

export default React.memo(CustomerCard);
