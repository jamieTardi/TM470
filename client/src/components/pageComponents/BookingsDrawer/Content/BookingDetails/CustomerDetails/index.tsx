import React, { useState, useCallback, useEffect } from "react";
import { Search, Icon } from "../../../../../";
import { searchCustomers, getSingleCustomer } from "../../../../../../Api/customers";
import { ICustomer } from "../../../../../../Types/customer";
import styles from "./customerDetails.module.scss";
import cx from "classnames";
import { TBooking } from "../../../../../../Types/booking";
import CustomerCard from "../../../../general/CustomerCard";
import NoSelectionCard from "../../../../general/NoSelectionCard";

type TProps = {
	booking: TBooking;
	setBooking: React.Dispatch<React.SetStateAction<any>>;
};

const CustomerDetails = ({ booking, setBooking }: TProps) => {
	const [searchReturnCustomers, setSearchReturnCustomers] = useState<null | ICustomer[]>(null);
	const [isSearchLoading, setIsSearchLoading] = useState(false);
	const [showDropDown, setShowDropDown] = useState(false);
	const [currentCustomer, setCurrentCustomer] = useState<null | ICustomer>(null);
	const [hoverId, setHoverId] = useState<string>();

	const handleUpdateSearch = useCallback((searchTerm: string) => {
		if (!searchTerm) {
			setShowDropDown(false);
			return;
		}
		setShowDropDown(true);
		setIsSearchLoading(true);
		searchCustomers(searchTerm, setSearchReturnCustomers, setIsSearchLoading);
	}, []);

	const handleAddCustomer = useCallback(
		(customer: ICustomer) => {
			setBooking({ ...booking, customerId: customer._id });
			setCurrentCustomer(customer);
			setShowDropDown(false);
		},
		[booking, setBooking]
	);

	const handleRemoveCard = () => {
		setBooking({ ...booking, customerId: "" });
		setCurrentCustomer(null);
	};

	useEffect(() => {
		if (!booking.customerId) {
			return;
		}
		getSingleCustomer(booking.customerId, setCurrentCustomer);
	}, [booking.customerId]);

	return (
		<section className={styles.customerDetails}>
			<h3 className={styles.customerDetails__title}>1. Add the Customer</h3>
			<div className={styles.customerDetails__top}>
				<p>
					<span className="bold">Search by:</span> First name, Last name, Nick name, Phone number, Email address
				</p>
			</div>
			<Search handleUpdateSearch={handleUpdateSearch} isLoading={isSearchLoading} showMenu={showDropDown}>
				<>
					{searchReturnCustomers?.length !== 0 ? (
						searchReturnCustomers?.map((customer: ICustomer) => (
							<li
								key={customer._id}
								className={cx("space-between")}
								onMouseEnter={() => setHoverId(customer._id!)}
								onMouseLeave={() => setHoverId("")}
								onClick={() => handleAddCustomer(customer)}
							>
								<div>
									<span>
										{customer.firstName} {customer.nickName && `"${customer.nickName}"`} {customer.lastName}
									</span>
									<h6 className="bold">{customer.email}</h6>
								</div>
								<div>
									<h6 className={cx(styles.customerDetails__phone)}>
										<Icon type="phone" size="small" colour={hoverId === customer._id ? "white" : "blue"} />
										{customer.phone}
									</h6>
								</div>
							</li>
						))
					) : (
						<li>No search results for that query.</li>
					)}
				</>
			</Search>
			{currentCustomer ? (
				<CustomerCard handleRemove={handleRemoveCard} customer={currentCustomer} />
			) : (
				<NoSelectionCard />
			)}
		</section>
	);
};

export default React.memo(CustomerDetails);
