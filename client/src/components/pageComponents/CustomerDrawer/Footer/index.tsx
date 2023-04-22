import React from "react";
import { Button, DrawerFooter, Pillcase } from "../../../";
import styles from "../customerDrawer.module.scss";

type TProps = {
	existingCustomer: boolean;
	loading: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<any>>;
	handleClearParams: React.MouseEventHandler<HTMLButtonElement>;
	isDisabled: boolean;
};

const Footer = ({ existingCustomer, loading, setShowModal, handleClearParams, isDisabled }: TProps) => {
	return (
		<DrawerFooter className={styles.drawer__footer}>
			{existingCustomer && (
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
				<Button variant="success" type="submit" disabled={!existingCustomer ? isDisabled : false} isLoading={loading}>
					{!existingCustomer ? "Create Customer" : "Update Customer"}
				</Button>
				<Button variant="default" onClick={handleClearParams}>
					Close
				</Button>
			</Pillcase>
		</DrawerFooter>
	);
};

export default React.memo(Footer);
