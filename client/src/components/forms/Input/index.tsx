import React from "react";
import styles from "./input.module.scss";
import cx from "classnames";

type TProps = {
	title: string;
	hasPopup?: boolean;
	required: boolean;
	setValueUpdate: Function;
	valueUpdate: object;
	name?: string;
	invalidInput?: boolean;
	inputLength?: number;
	className?: string;
	currentValue?: string | number;
	type?: string;
	changeFunc?: Function | null;
};

type TComponentProps = React.HTMLProps<HTMLInputElement> & TProps;

const InputBox = ({
	title = "Name",
	name,
	type = "input",
	valueUpdate,
	setValueUpdate,
	invalidInput,
	inputLength = 45,
	required,
	className,
	currentValue,
	changeFunc = null,
	...restHTMLProps
}: TComponentProps) => {
	const handleChange = (e: any) => {
		if (!name) {
			return;
		}
		setValueUpdate({ ...valueUpdate, [name]: e.target.value });
		if (changeFunc) {
			changeFunc(e.target.value);
		}
	};
	return (
		<div className={styles.input} data-testid="container">
			<input
				type={type}
				className={cx(styles.input__field, className)}
				placeholder={title}
				defaultValue={currentValue}
				name={title}
				onChange={(e) => handleChange(e)}
				id={title}
				required={required}
				maxLength={inputLength}
				{...restHTMLProps}
			/>
			<label htmlFor={title} className={styles.input__label}>
				{title}
			</label>
		</div>
	);
};

export default React.memo(InputBox);
