import React from "react";
import { Tab, Tabs } from "../../../components";
import Icon from "../../../components/icon";
import styles from "../availability.module.scss";

type TProps = {
	currentYear: number;
	setCurrentYear: React.Dispatch<React.SetStateAction<number>>;
};

const YearSelection = ({ currentYear, setCurrentYear }: TProps) => {
	return (
		<Tabs className={styles.availability__tabs}>
			<Tab
				start={true}
				end={false}
				handleSelection={() => setCurrentYear(currentYear - 1)}
				tabId={currentYear}
				selectedId=""
			>
				<Icon type="arrow-left" size="medium" />
			</Tab>
			<Tab start={false} end={false} handleSelection={() => {}} tabId={currentYear} selectedId="">
				{currentYear}
			</Tab>
			<Tab
				start={false}
				end={true}
				handleSelection={() => setCurrentYear(currentYear + 1)}
				tabId={currentYear}
				selectedId=""
			>
				<Icon type="arrow-right" size="medium" />
			</Tab>
		</Tabs>
	);
};

export default React.memo(YearSelection);
