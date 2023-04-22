import React from "react";
import { MiniCard } from "../../../components/index";
import styles from "./miniCardWrapper.module.scss";

const MiniCardWrapper = () => {
	const defaultDetails = {
		title: "Total Takings",
		value: "£3800",
		notes: "Year ending 2023",
	};
	return (
		<div className={styles.miniCardWrapper}>
			<MiniCard cardDetails={defaultDetails} />
			<MiniCard cardDetails={defaultDetails} />
			<MiniCard cardDetails={defaultDetails} />
			<MiniCard cardDetails={defaultDetails} />
		</div>
	);
};

export default React.memo(MiniCardWrapper);
