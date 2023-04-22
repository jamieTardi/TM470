import React from "react";
import { Icon } from "../..";
import { TColours } from "../../../Types/components";
import styles from "./toast.module.scss";
import { motion } from "framer-motion";
import cx from "classnames";

type TProps = {
	textContent: string;
	colour: TColours;
	className?: string;
};

const Toast = ({ textContent, colour, className }: TProps) => {
	return (
		<motion.div
			className={cx(styles.toast, className)}
			transition={{ duration: 0.5 }}
			initial={{ x: 600 }}
			animate={{ x: 0 }}
			exit={{ x: -600 }}
		>
			<Icon type="info" colour={colour} />
			<p dangerouslySetInnerHTML={{ __html: textContent }} />
		</motion.div>
	);
};

export default React.memo(Toast);
