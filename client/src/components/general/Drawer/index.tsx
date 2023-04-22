import React from "react";
import styles from "./drawer.module.scss";
import cx from "classnames";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

type TProps = {
	children: React.ReactNode;
	className?: string;
};

const Drawer = ({ className, children }: TProps) => {
	const location = useLocation();
	return (
		<motion.article
			className={cx(styles.drawer, className, "scrollable-blue")}
			key={location.pathname}
			transition={{ duration: 0.35 }}
			initial={{ x: 600 }}
			animate={{ x: 0 }}
			exit={{ x: -600 }}
		>
			{children}
		</motion.article>
	);
};

export default React.memo(Drawer);
