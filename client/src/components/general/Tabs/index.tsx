import React from "react";
import styles from "./tabs.module.scss";
import cx from "classnames";

type TProps = {
	children: React.ReactNode;
	className?: string;
};

const Tabs = ({ children, className }: TProps) => {
	return <ul className={cx(styles.tabs, className)}>{children}</ul>;
};

export default React.memo(Tabs);
