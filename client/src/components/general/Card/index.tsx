import React from "react";
import cx from "classnames";
import styles from "./card.module.scss";
import { motion } from "framer-motion";

type TProps = {
	className?: string;
	children: React.ReactNode;
	scale?: number;
};

const Card = ({ className, children, scale = 1.05 }: TProps) => {
	return (
		<motion.section whileHover={{ scale }} className={cx(styles.card, className)}>
			{children}
		</motion.section>
	);
};

export default React.memo(Card);
