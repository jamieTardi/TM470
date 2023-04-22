import React from "react";
import styles from "../drawer.module.scss";
import cx from "classnames";

type TProps = {
	children: React.ReactNode;
	className?: string;
};

const DrawerContent = ({ children, className }: TProps) => {
	return <section className={cx(styles.drawerContent, className)}>{children}</section>;
};

export default React.memo(DrawerContent);
