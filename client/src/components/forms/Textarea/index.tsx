import React from "react";
import styles from "./textarea.module.scss";
import cx from "classnames";

type Props = {
	label: string;
	name: string;
	setValueUpdate: React.Dispatch<React.SetStateAction<any>>;
	valueUpdate: object;
	required?: boolean;
	placeholder?: string;
	maxLength?: number;
	disabled?: boolean;
	currentValue?: string;
	columns?: number;
	rows?: number;
	className?: string;
};

const Textarea = ({
	label,
	name,
	setValueUpdate,
	valueUpdate,
	required,
	placeholder,
	maxLength = 300,
	disabled,
	currentValue,
	columns,
	rows = 5,
	className,
}: Props) => {
	return (
		<div className={cx(styles.textarea, className)}>
			<label>{label}</label>
			<p>Maximum input length is {maxLength} characters.</p>
			<textarea
				className={styles.textarea__text}
				name={name}
				disabled={disabled}
				required={required}
				placeholder={placeholder}
				onChange={(e) => setValueUpdate({ ...valueUpdate, [name]: e.target.value })}
				maxLength={maxLength}
				defaultValue={currentValue}
				cols={columns}
				rows={rows}
			/>
		</div>
	);
};

export default React.memo(Textarea);
