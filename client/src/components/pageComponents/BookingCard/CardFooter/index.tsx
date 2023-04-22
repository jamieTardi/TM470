import React, { useCallback, useState } from "react";
import { TBooking } from "../../../../Types/booking";
import { Button, Toast } from "../../..";
import { emailBooking } from "../../../../Api/booking";
import styles from "./cardFooter.module.scss";
import { TResponseState } from "../../../../Types/general";

import { RootState } from "../../../../Redux/store";
import { useSelector } from "react-redux";

type TProps = {
	booking: TBooking;
};

const CardFooter = ({ booking }: TProps) => {
	const [isLoading, setIsLoading] = useState<null | boolean>(null);
	const [resState, setResState] = useState<TResponseState>({ isError: false, message: "" });

	const user: IUser = useSelector<RootState>((state) => state.auth.user) as IUser;

	const handleClearLoading = useCallback(() => {
		setIsLoading(false);
	}, []);

	const handleEmailBooking = useCallback(() => {
		setIsLoading(true);
		emailBooking(booking, handleClearLoading, setResState, user._id!);
	}, [booking, handleClearLoading, user]);
	return (
		<div className={styles.cardFooter}>
			<div>
				<Button onClick={handleEmailBooking} isLoading={isLoading!} disabled={isLoading !== null}>
					Email Booking Info
				</Button>
			</div>
			{resState.message && (
				<Toast
					className={styles.cardFooter__toast}
					colour={resState.isError ? "red" : "green"}
					textContent={resState.message}
				/>
			)}
		</div>
	);
};

export default React.memo(CardFooter);
