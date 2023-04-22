import React, { useCallback, useState } from "react";
import styles from "./customers.module.scss";
import { Tooltip, Button, Icon, CustomerCards, Pill } from "../../components";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import CustomerDrawer from "../../components/pageComponents/CustomerDrawer";
import CustomerLoader from "../../components/helpers/CustomerLoader";
import TabWrapper from "./TabWrapper";
import FilterWrapper from "./FilterWrapper";
import { filterByTranslation } from "../../utils/filterByTranslation";
import Pillcase from "../../components/general/pillcase";
import SearchWrapper from "./SearchWrapper";
import { ICustomer } from "../../Types/customer";
import { useCurrentWidth } from "../../hooks/useCurrentWidth";

const Customers = () => {
	const [searchReturnCustomers, setSearchReturnCustomers] = useState<null | ICustomer[]>(null);
	const [searchTerm, setSearchTerm] = useState<null | string>(null);
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const customerId = searchParams.get("customerId");
	const filterBy = searchParams.get("filterBy");
	const filter = searchParams.get("filter");
	const isMobile = useCurrentWidth() < 900;

	const handleNewCustomer = useCallback(() => {
		navigate({
			pathname: "",
			search: createSearchParams({
				customerId: "new",
				filter: filter ? filter : "A",
				filterBy: filterBy ? filterBy : "firstName",
			}).toString(),
		});
	}, [navigate, filter, filterBy]);

	const handleResetSearch = useCallback(() => {
		setSearchTerm(null);
		setSearchReturnCustomers(null);
	}, []);

	return (
		<main className={styles.customers}>
			<CustomerLoader />

			<div className={styles.customers__top}>
				<h1>Customers</h1>
				<Tooltip direction="left" content="Add a new customer">
					<Button variant="success" onClick={handleNewCustomer}>
						<Icon type="plus" size="x-large" />
					</Button>
				</Tooltip>
			</div>

			<div className={styles.customers__interactive}>
				{!isMobile && <TabWrapper />}
				<div className={styles.customers__search}>
					{!isMobile && <FilterWrapper />}
					<SearchWrapper
						searchReturnCustomers={searchReturnCustomers}
						setSearchReturnCustomers={setSearchReturnCustomers}
						setSearchTerm={setSearchTerm}
						searchTerm={searchTerm}
					/>
				</div>
				<Pillcase>
					Filtering by:{" "}
					<Pill value="success" colour="white">
						{filterBy ? filterByTranslation(filterBy) : "First Name"}
					</Pill>
					<Pill value="success" colour="white">
						Search letter: {filter ? filter : "A"}
					</Pill>
					{searchReturnCustomers && (
						<Pill value="maintenance" button="close" handleAction={handleResetSearch}>
							{searchTerm}
						</Pill>
					)}
				</Pillcase>
			</div>

			<div className={styles.customers__cards}>
				<CustomerCards searchReturnCustomers={searchReturnCustomers} />
			</div>

			{customerId && (
				<>
					<div className="overlay" />
					<CustomerDrawer />
				</>
			)}
		</main>
	);
};

export default React.memo(Customers);
