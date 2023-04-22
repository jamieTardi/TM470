import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchCustomers } from "../../../Redux/slices/customersSlice";
import { RootState, useAppDispatch } from "../../../Redux/store";

const CustomerLoader = () => {
	const user: IUser = useSelector<RootState>((state) => state.auth.user) as IUser;
	const [searchParams] = useSearchParams();
	const selectedFilter = searchParams.get("filterBy");
	const selectedId = searchParams.get("filter");
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!user._id) {
			return;
		}
		dispatch(
			fetchCustomers({
				id: user._id,
				filter: selectedId ? selectedId : "A",
				filterBy: selectedFilter ? selectedFilter : "firstName",
			})
		);
	}, [dispatch, user._id, selectedId, selectedFilter]);

	return null;
};

export default React.memo(CustomerLoader);
