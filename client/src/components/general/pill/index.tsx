import React, { MouseEventHandler } from "react";
import Icon from "../../icon";
import styles from "./pill.module.scss";

type TProps = {
	children: React.ReactNode;
	variant?: string;
	value?: "low" | "medium" | "high" | "success" | "maintenance";
	className?: string;
	icon?: string;
	colour?: string;
	button?: string;
	handleAction?: MouseEventHandler<HTMLButtonElement>;
};

const Pill = ({ children, variant = "", value = "low", icon = "", colour, button, handleAction }: TProps) => {
	return (
		<div
			className={styles.pill}
			data-variant={variant}
			data-colour={colour}
			data-value={value}
			data-testid="pill-container"
			data-hasicon={!!icon}
		>
			{icon && <Icon type={icon} data-testid="icon" size="small" colour={colour} className="pill__icon" />}

			<span className="pill__content">{children}</span>
			{button && (
				<button onClick={handleAction}>
					<Icon type={button} data-testid="icon" size="small" colour={colour} className="pill__icon" />
				</button>
			)}
		</div>
	);
};

export default React.memo(Pill);
