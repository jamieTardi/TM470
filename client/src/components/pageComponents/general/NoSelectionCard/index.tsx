import React from "react";
import styles from "./noSelectionCard.module.scss";

type TProps = {
	item?: string;
};

const NoSelectionCard = ({ item = "customer" }: TProps) => {
	return (
		<div className={styles.noSelectionCard}>
			Currently there is no {item} selected, please select a {item} from the search bar above.
		</div>
	);
};

export default React.memo(NoSelectionCard);
