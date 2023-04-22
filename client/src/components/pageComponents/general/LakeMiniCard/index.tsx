import React from "react";
import styles from "./lakeMiniCard.module.scss";
import { Card, CardBody, CardHeader } from "../../..";
import Icon from "../../../icon";

type TProps = {
	lake: TLake;
	handleRemove: React.MouseEventHandler<HTMLButtonElement>;
};

const LakeMiniCard = ({ lake, handleRemove }: TProps) => {
	return (
		<Card className={styles.lakeMiniCard}>
			<CardHeader className={styles.lakeMiniCard__header}>
				<h3>{lake.name}</h3>
				<button onClick={handleRemove} title="Click to remove lake">
					<Icon type="close" />
				</button>
			</CardHeader>
			<CardBody className={styles.lakeMiniCard__body}>
				<div>
					<span className="bold">Current Selection: </span>
					<p>
						You have currently selected {lake.name} as the choice for the current party. If you would like to remove
						this lake please press the button
					</p>
				</div>
			</CardBody>
		</Card>
	);
};

export default React.memo(LakeMiniCard);
