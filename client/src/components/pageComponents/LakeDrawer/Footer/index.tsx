import React from "react";
import Button from "../../../forms/Button";
import DrawerFooter from "../../../general/Drawer/DrawerFooter";
import Pillcase from "../../../general/pillcase";
import styles from "../lakeDrawer.module.scss";

type TProps = {
	handleClearParams: React.MouseEventHandler<HTMLButtonElement>;
	loading: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<any>>;
	existingLake: boolean;
	isDisabled: boolean;
};

const Footer = ({ existingLake, loading, setShowModal, isDisabled, handleClearParams }: TProps) => {
	return (
		<DrawerFooter className={styles.drawer__footer}>
			{existingLake && (
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
				<Button variant="success" type="submit" disabled={!existingLake ? isDisabled : false} isLoading={loading}>
					{!existingLake ? "Create Lake" : "Update Lake"}
				</Button>
				<Button variant="default" onClick={handleClearParams}>
					Close
				</Button>
			</Pillcase>
		</DrawerFooter>
	);
};

export default Footer;
