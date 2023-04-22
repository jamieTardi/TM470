import React from "react";
import { Card } from "../../index";
import styles from "./miniCard.module.scss";

type TProps = {
	cardDetails: TMiniCard;
};

type TMiniCard = {
	title: string;
	value: string;
	notes: string;
};

const MiniCard = ({ cardDetails }: TProps) => {
	return (
		<Card className={styles.miniCard}>
			<div>{cardDetails.title} </div>
			<div>{cardDetails.value} </div>
			<span>{cardDetails.value} </span>
			<div>{cardDetails.notes} </div>
		</Card>
	);
};

export default React.memo(MiniCard);
