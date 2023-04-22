import React, { useCallback, useEffect } from "react";
import { ICustomer } from "../../../../Types/customer";
import { Location, DrawerContent, Input, Textarea } from "../../../index";

import styles from "../customerDrawer.module.scss";

type Props = {
	customer: ICustomer;
	setCustomer: React.Dispatch<React.SetStateAction<any>>;
	setIsDisabled: React.Dispatch<React.SetStateAction<any>>;
};

const Content = ({ customer, setCustomer, setIsDisabled }: Props) => {
	const handleUpdateLocation = useCallback(
		(location: string[]) => {
			setCustomer((prevCustomer: ICustomer) => ({
				...prevCustomer,
				location: { ...prevCustomer.location, gps: location },
			}));
		},
		[setCustomer]
	);

	useEffect(() => {
		if (!customer.firstName || !customer.lastName || !customer.phone) {
			setIsDisabled!(true);
			return;
		}
		setIsDisabled!(false);
	}, [customer.firstName, customer.lastName, customer.phone, setIsDisabled]);

	return (
		<DrawerContent className={styles.content}>
			<div className={styles.content__input1}>
				<Input
					title="First Name"
					name="firstName"
					setValueUpdate={setCustomer}
					valueUpdate={customer}
					currentValue={customer.firstName}
					required={true}
					className="input"
				/>
				<Input
					title="Last Name"
					name="lastName"
					setValueUpdate={setCustomer}
					valueUpdate={customer}
					currentValue={customer.lastName}
					required={true}
					className="input"
				/>
			</div>
			<div className={styles.content__input2}>
				<Input
					title="Nick Name"
					name="nickName"
					setValueUpdate={setCustomer}
					valueUpdate={customer}
					currentValue={customer.nickName}
					required={false}
					className="input"
				/>
				<Input
					title="Phone number"
					name="phone"
					setValueUpdate={setCustomer}
					valueUpdate={customer}
					currentValue={customer.phone}
					required={true}
					className="input"
				/>
			</div>
			<div>
				<Input
					title="Email"
					name="email"
					setValueUpdate={setCustomer}
					valueUpdate={customer}
					currentValue={customer.email}
					required={true}
					className="input"
				/>
			</div>

			<div>
				<Textarea
					setValueUpdate={setCustomer}
					valueUpdate={customer}
					currentValue={customer.notes}
					label="Notes for this customer (optional)"
					name="notes"
				/>
			</div>
			<div></div>

			<Location
				className={styles["drawer__content--form--group5"]}
				handleUpdateLocation={handleUpdateLocation}
				currentLocation={customer.location.gps}
			/>
		</DrawerContent>
	);
};

export default React.memo(Content);
