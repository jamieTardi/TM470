import React, { MouseEventHandler } from "react";
import Button from "../../forms/Button";
import styles from "./modal.module.scss";

type TProps = {
	handleChange?: MouseEventHandler<HTMLButtonElement>;
	title: string;
	children: React.ReactNode;
	handleClose: MouseEventHandler<HTMLButtonElement>;
	buttonTxt?: string;
	loading?: boolean;
};

const Modal = ({ handleChange, title, children, handleClose, buttonTxt, loading }: TProps) => {
	return (
		<div className={styles.container}>
			<section className={styles.model}>
				<div className={styles.model__title}>
					<h2>{title}</h2>
				</div>
				<div className={styles.model__content}>{children}</div>
				<div className={styles.model__footer}>
					<Button onClick={handleClose}>Close</Button>
					{buttonTxt && (
						<Button onClick={handleChange} variant="destructive" isLoading={loading}>
							{buttonTxt}
						</Button>
					)}
				</div>
			</section>
		</div>
	);
};

export default React.memo(Modal);
