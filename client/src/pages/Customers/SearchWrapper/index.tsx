import React, { useState, useCallback } from "react";
import { searchCustomers } from "../../../Api/customers";
import { Search } from "../../../components";
import { ICustomer } from "../../../Types/customer";
import cx from "classnames";
import styles from "./searchWrapper.module.scss";
import Icon from "../../../components/icon";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

type TProps = {
	searchReturnCustomers: ICustomer[] | null;
	setSearchReturnCustomers: React.Dispatch<React.SetStateAction<any>>;
	setSearchTerm: React.Dispatch<React.SetStateAction<any>>;
	searchTerm?: string | null;
};

const SearchWrapper = ({ searchReturnCustomers, setSearchReturnCustomers, setSearchTerm, searchTerm }: TProps) => {
	const [isSearchLoading, setIsSearchLoading] = useState(false);
	const [showDropDown, setShowDropDown] = useState(false);
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const filterBy = searchParams.get("filterBy");
	const filter = searchParams.get("filter");
	const [hoverId, setHoverId] = useState<string>();
	const handleUpdateSearch = useCallback(
		(searchTerm: string) => {
			if (!searchTerm) {
				setShowDropDown(false);
				return;
			}
			if (searchTerm.length <= 2) {
				return setSearchReturnCustomers(null);
			}
			setSearchTerm(searchTerm);
			setShowDropDown(true);
			setIsSearchLoading(true);
			searchCustomers(searchTerm, setSearchReturnCustomers, setIsSearchLoading);
		},
		[setSearchReturnCustomers, setSearchTerm]
	);

	const handleOpenDrawer = useCallback(
		(id: string) => {
			navigate({
				pathname: "",
				search: createSearchParams({
					customerId: id,
					filter: filter ? filter : "A",
					filterBy: filterBy ? filterBy : "firstName",
				}).toString(),
			});
			setShowDropDown(false);
		},
		[filter, filterBy, navigate]
	);
	return (
		<div className={styles.searchWrapper}>
			<Search
				handleUpdateSearch={handleUpdateSearch}
				isLoading={isSearchLoading}
				showMenu={showDropDown}
				searchTerm={searchTerm}
			>
				<>
					{searchReturnCustomers?.length !== 0 && showDropDown ? (
						searchReturnCustomers?.map((customer: ICustomer) => (
							<li
								key={customer._id}
								className={cx("space-between")}
								onMouseEnter={() => setHoverId(customer._id!)}
								onMouseLeave={() => setHoverId("")}
								onClick={() => handleOpenDrawer(customer._id!)}
							>
								<div>
									<span>
										{customer.firstName} {customer.nickName && `"${customer.nickName}"`} {customer.lastName}
									</span>
									<h6 className="bold">{customer.email}</h6>
								</div>
								<div>
									<h6 className={cx(styles.searchWrapper__phone)}>
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
		</div>
	);
};

export default React.memo(SearchWrapper);
