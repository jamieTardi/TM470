import React, { useState, useEffect } from "react";
import styles from "./checkbox.module.scss";
import cx from "classnames";

type TProps = {
	label: string;
	handleCheckboxChange: Function;
	className?: string;
	valueKey: string;
	defaultChecked: boolean | undefined;
};

const Checkbox = ({ label, valueKey, handleCheckboxChange, className, defaultChecked = false }: TProps) => {
	const [isChecked, setIsChecked] = useState(defaultChecked);

	useEffect(() => {
		setIsChecked(defaultChecked);
	}, [defaultChecked]);

	const handleUpdate = () => {
		setIsChecked(!isChecked);
		handleCheckboxChange(!isChecked, valueKey);
	};

	return (
		<label className={cx(styles.checkbox, className)}>
			<input
				type="checkbox"
				onChange={handleUpdate}
				checked={isChecked}
				className={cx({ [styles.checkbox__checked]: isChecked })}
			/>
			{label}
		</label>
	);
};

export default React.memo(Checkbox);
