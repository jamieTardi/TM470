import React from "react";
import styles from "./empty.module.scss";

type TProps = {
	title: string;
};

const Empty = ({ title }: TProps) => {
	return (
		<div className={styles.empty}>
			<h1>{title}</h1>
			<img src="images/empty.png" alt="no bookings" />
		</div>
	);
};

export default React.memo(Empty);
