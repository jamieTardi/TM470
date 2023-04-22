import React, { useState } from "react";
import styles from "./tooltip.module.scss";
import cx from "classnames";

type TProps = {
	delay?: number;
	children: React.ReactNode;
	direction: "top" | "bottom" | "left" | "right";
	content: React.ReactNode;
	className?: string;
};

const Tooltip = ({ delay, children, direction, content, className }: TProps) => {
	let timeout: number | NodeJS.Timeout;
	const [active, setActive] = useState(false);

	const showTip = () => {
		timeout = setTimeout(() => {
			setActive(true);
		}, delay || 400);
	};

	const hideTip = () => {
		clearInterval(timeout);
		setActive(false);
	};

	return (
		<div className={cx(styles.tooltip, className)} onMouseEnter={showTip} onMouseLeave={hideTip}>
			{children}
			{active && <div className={cx(styles.tooltip__tip, ` ${direction || "top"}`)}>{content}</div>}
		</div>
	);
};

export default React.memo(Tooltip);
