import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import { ICustomer } from "../../../Types/customer";
import { Button, Card, CardHeader, Empty } from "../../";
import Loading from "../../general/Loading";
import styles from "./customerCards.module.scss";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import CardContent from "./CardContent";

type TProps = {
	searchReturnCustomers: ICustomer[] | null;
};

const CustomerCards = ({ searchReturnCustomers }: TProps) => {
	const customers: ICustomer[] = useSelector<RootState>((state) => state.customersState.customer) as ICustomer[];
	const isLoading: boolean = useSelector<RootState>((state) => state.customersState.loading) as boolean;
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const filterBy = searchParams.get("filterBy");
	const filter = searchParams.get("filter");
	const customersArr = searchReturnCustomers ? searchReturnCustomers : customers;

	const handleNavigate = (id: string) => {
		navigate({
			pathname: "",
			search: createSearchParams({
				customerId: id,
				filter: filter ? filter : "A",
				filterBy: filterBy ? filterBy : "firstName",
			}).toString(),
		});
	};

	if (isLoading || !customers) {
		return <Loading />;
	}

	if (!customers.length) {
		return (
			<div className={styles.empty}>
				<Empty title="There are no customers for this filter." />
			</div>
		);
	}

	return (
		<>
			{customersArr.map((customer) => (
				<Card className={styles.card} key={customer._id}>
					<CardHeader className={styles.card__cardHeader}>
						<h3>
							{customer.firstName} {customer.nickName && `"${customer.nickName}"`} {customer.lastName}
						</h3>
						<Button icon="open" variant="clear" onClick={() => handleNavigate(`${customer._id}`)}>
							Open
						</Button>
					</CardHeader>
					<CardContent customer={customer} className={styles.card__content} />
				</Card>
			))}
		</>
	);
};

export default React.memo(CustomerCards);
