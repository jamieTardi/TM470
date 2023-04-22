import React from "react";
import { Button, DrawerFooter, Pillcase } from "../../../../../index";
import styles from "./footer.module.scss";

type TProps = {
	existingBooking: boolean;
	loading: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<any>>;
	handleClearParams: React.MouseEventHandler<HTMLButtonElement>;
	isDisabled: boolean;
	isNegativePrice: boolean;
};

const Footer = ({ loading, handleClearParams, isDisabled, existingBooking, setShowModal, isNegativePrice }: TProps) => {
	return (
		<DrawerFooter className={styles.drawer__footer}>
			{existingBooking && (
				<Button
					className={styles["drawer__footer--deleteBtn"]}
					variant="destructive"
					type="button"
					isLoading={loading}
					onClick={() => setShowModal(true)}
				>
					Delete
				</Button>
			)}
			<Pillcase>
				<Button
					variant="success"
					type="submit"
					isLoading={loading}
					disabled={isDisabled || isNegativePrice}
					title={isDisabled ? "There is some booking information missing" : "Create Booking"}
				>
					{!existingBooking ? "Create Booking" : "Update Booking"}
				</Button>
				<Button variant="default" onClick={handleClearParams}>
					Close
				</Button>
			</Pillcase>
		</DrawerFooter>
	);
};

export default React.memo(Footer);
