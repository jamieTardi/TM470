import React from "react";
import cx from "classnames";
import styles from "./pillcase.module.scss";

type TProps = {
	children: React.ReactNode;
	className?: string;
};

const Pillcase = ({ children, className = "" }: TProps) => {
	return (
		<div className={cx(styles.pillcase, className)} data-testid="pillcase-container">
			{children}
		</div>
	);
};

export default React.memo(Pillcase);
