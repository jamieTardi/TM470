import React, { MouseEventHandler } from "react";
import styles from "../drawer.module.scss";
import cx from "classnames";
import Icon from "../../../icon";

type TProps = {
	children: React.ReactNode;
	className?: string;
	handleClose: MouseEventHandler<HTMLButtonElement>;
	colour?: string;
};

const DrawerHeader = ({ children, className, handleClose, colour = "black" }: TProps) => {
	return (
		<section className={cx(styles.drawerHeader, className)}>
			<button className={styles.drawer__close} onClick={handleClose}>
				<Icon type="close" colour={colour} />
				Close
			</button>

			{children}
		</section>
	);
};

export default DrawerHeader;
