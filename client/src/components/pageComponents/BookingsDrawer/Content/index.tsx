import React, { useState, useEffect } from "react";
import { DrawerContent, Loading } from "../../../";
import { TBooking } from "../../../../Types/booking";
import BookingInfo from "./BookingDetails/BookingInfo";
import CustomerDetails from "./BookingDetails/CustomerDetails";
import LakeDetails from "./BookingDetails/LakeDetails";

type TProps = {
	booking: TBooking;
	setBooking: React.Dispatch<React.SetStateAction<TBooking>>;
	existingBooking: TBooking | undefined;
	isSendEmail: boolean;
	setIsSendEmail: React.Dispatch<React.SetStateAction<boolean>>;
};

const Content = ({ booking, setBooking, existingBooking, isSendEmail, setIsSendEmail }: TProps) => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 750);
	}, []);

	if (loading) {
		return <Loading />;
	}

	return (
		<DrawerContent>
			<CustomerDetails booking={booking} setBooking={setBooking} />
			<LakeDetails booking={booking} setBooking={setBooking} />
			<BookingInfo
				booking={booking}
				setBooking={setBooking}
				existingBooking={existingBooking}
				isSendEmail={isSendEmail}
				setIsSendEmail={setIsSendEmail}
			/>
		</DrawerContent>
	);
};

export default React.memo(Content);
