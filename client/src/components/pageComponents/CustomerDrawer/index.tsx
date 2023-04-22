import React, { useCallback, useEffect, useState } from "react";
import cx from "classnames";
import { Drawer, Modal, DrawerHeader, Loading } from "../../";
import styles from "./customerDrawer.module.scss";
import { useSearchParams } from "react-router-dom";
import Content from "./Content";
import { defaultCustomer } from "../../../state/customer";
import { ICustomer } from "../../../Types/customer";
import Footer from "./Footer";
import { createCustomer, deleteCustomer, updateCustomer } from "../../../Api/customers";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../Redux/store";
import { fetchCustomers } from "../../../Redux/slices/customersSlice";
import { useShowMap } from "../../../hooks/useShowMap";

type Props = {};

const CustomerDrawer = (props: Props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [isDisabled, setIsDisabled] = useState(true);
	const [searchParams, setSearchParams] = useSearchParams();
	const customerId = searchParams.get("customerId");
	const user: IUser = useSelector<RootState>((state) => state.auth.user) as IUser;
	const currentCustomers: ICustomer[] = useSelector<RootState>((state) => state.customersState.customer) as ICustomer[];
	const dispatch = useAppDispatch();
	const existingCustomer: ICustomer | undefined =
		currentCustomers && currentCustomers.filter((customer: ICustomer) => customer._id === customerId)[0];

	const mapLoading = useShowMap();

	const [customer, setCustomer] = useState<ICustomer>(defaultCustomer);

	const handleClearParams = useCallback(() => {
		searchParams.delete("customerId");
		setSearchParams(searchParams);
	}, [searchParams, setSearchParams]);

	const handleClearLoading = useCallback(() => {
		setTimeout(() => {
			dispatch(fetchCustomers({ id: user._id!, filter: "A", filterBy: "firstname" }));
			setIsLoading(false);
			handleClearParams();
		}, 1500);
	}, [handleClearParams, dispatch, user._id]);

	const handleSendForm = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			setIsLoading(true);
			e.preventDefault();
			if (!existingCustomer) {
				createCustomer({ ...customer, assignedUsersId: [user._id!] }, handleClearLoading);
				return;
			}
			updateCustomer(customer, handleClearLoading);
		},
		[customer, existingCustomer, handleClearLoading, user._id]
	);

	const handleDelete = useCallback(() => {
		setIsLoading(true);
		deleteCustomer(customer._id!, handleClearLoading);
	}, [handleClearLoading, customer._id]);

	useEffect(() => {
		if (!existingCustomer) {
			return;
		}
		setCustomer(existingCustomer);
	}, [existingCustomer]);

	return (
		<form onSubmit={(e) => handleSendForm(e)} className={cx({ "no-clicks": showModal })}>
			<Drawer className={styles["customer-drawer"]}>
				{!mapLoading ? (
					<Loading />
				) : (
					<>
						<DrawerHeader handleClose={handleClearParams}>
							<h2>
								{existingCustomer
									? `Edit customer: ${customer.firstName} ${customer.lastName}`
									: "Create a new customer"}
							</h2>
						</DrawerHeader>
						<Content customer={customer} setCustomer={setCustomer} setIsDisabled={setIsDisabled} />
						<Footer
							handleClearParams={handleClearParams}
							existingCustomer={!!existingCustomer}
							loading={isLoading}
							setShowModal={setShowModal}
							isDisabled={isDisabled}
						/>
					</>
				)}
			</Drawer>

			{showModal && (
				<Modal
					title={`Delete ${customer.firstName} ${customer.lastName}?`}
					handleClose={() => setShowModal(false)}
					buttonTxt="Delete"
					loading={isLoading}
					handleChange={handleDelete}
				>
					Are you Sure you want to delete this customer? This will <span className="bold">PERMANENTLY</span> delete this
					customer and all of their associated information?
				</Modal>
			)}
		</form>
	);
};

export default React.memo(CustomerDrawer);
