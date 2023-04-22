import React from "react";
import styles from "./tab.module.scss";
import cx from "classnames";

type TProps = {
	children: React.ReactNode;
	handleSelection: Function;
	tabId: string | number;
	selectedId: string | undefined | number;
	start: boolean;
	end: boolean;
};

const Tab = ({ children, handleSelection, tabId, selectedId, start, end }: TProps) => {
	const isSelected = selectedId === tabId;

	return (
		<li className={styles.tab}>
			<button
				className={cx(
					{ [styles.tab__selected]: isSelected },
					{ [styles.start]: start },
					{ [styles.end]: end },
					{ [styles.border]: !end }
				)}
				onClick={() => handleSelection(tabId)}
			>
				{children}
			</button>
		</li>
	);
};

export default React.memo(Tab);
