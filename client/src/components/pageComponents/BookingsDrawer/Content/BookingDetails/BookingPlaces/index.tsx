import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Checkbox, Input, Toast } from "../../../../../";
import { RootState } from "../../../../../../Redux/store";
import { TBooking } from "../../../../../../Types/booking";
import { TResponseState } from "../../../../../../Types/general";

type TProps = {
	booking: TBooking;
	setBooking: React.Dispatch<React.SetStateAction<any>>;
};

const BookingPlaces = ({ booking, setBooking }: TProps) => {
	const lakesSelector = useSelector<RootState>((state) => state.lakes) as any;
	const lakes: TLake[] = lakesSelector.lakes;
	const selectedLake = lakes && lakes.filter((lake) => lake._id === booking.lakeId)[0];
	const [errorState, setErrorState] = useState<TResponseState>({ isError: false, message: "" });

	const [showInput, setShowInput] = useState(true);
	const handleUpdateCheckbox = () => {
		setShowInput(!showInput);
		setBooking({ ...booking, placesBooked: selectedLake.maxUsers });
		setErrorState({ isError: false, message: "" });
		return;
	};

	// TODO: Backend Validation needed

	const validateNumber = useCallback(
		(num: number) => {
			if (!selectedLake) {
				return;
			}
			if (num > selectedLake.maxUsers) {
				setBooking({ ...booking, placesBooked: selectedLake.maxUsers });
				setErrorState({ isError: true, message: "That number is over the max users for that lake" });
				return;
			} else if (num < 0) {
				setBooking({ ...booking, placesBooked: 0 });
				setErrorState({ isError: true, message: "That number is less than zero, please enter a valid number." });
				return;
			}
			setBooking({ ...booking, placesBooked: num });
			setErrorState({ isError: false, message: "" });
		},
		[booking, setBooking, selectedLake]
	);

	return (
		<div>
			<Checkbox
				label={`Lake Exclusive Booking`}
				valueKey="isExclusive"
				handleCheckboxChange={handleUpdateCheckbox}
				defaultChecked={false}
			/>
			{showInput && (
				<>
					<Input
						title={`Number of guests for booking max(${selectedLake && selectedLake.maxUsers})`}
						type="number"
						name="placesBooked"
						setValueUpdate={setBooking}
						currentValue={booking.placesBooked}
						valueUpdate={booking}
						required={true}
						className="input"
						changeFunc={validateNumber}
					/>
					{errorState.isError && <Toast colour="red" textContent={errorState.message} />}
				</>
			)}
		</div>
	);
};

export default React.memo(BookingPlaces);
