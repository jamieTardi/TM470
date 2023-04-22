import React from "react";
import styles from "./select.module.scss";
import cx from "classnames";

type TProps = {
	label: string;
	title?: string;
	className?: string;
	children: React.ReactNode;
	handleChange: Function;
	defaultValue?: string;
};

type TComponentProps = React.HTMLProps<HTMLSelectElement> & TProps;

const Select = ({
	className,
	label,
	title = "option",
	children,
	handleChange,
	defaultValue,
	...htmlProps
}: TComponentProps) => {
	return (
		<div className={cx(styles.select, className)}>
			<label htmlFor={label}>{label}</label>
			<div className={styles.select__selection}>
				<select id={label} onChange={(e) => handleChange(e.target.value)} defaultValue={defaultValue} {...htmlProps}>
					<option>Select a {title}</option>
					{children}
				</select>
			</div>
		</div>
	);
};

export default React.memo(Select);
