import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Loading, Tooltip } from "../../components";
import { fetchStaff } from "../../Redux/slices/staffSlice";
import { RootState, useAppDispatch } from "../../Redux/store";
import StaffDividers from "./StaffDividers";
import styles from "./staff.module.scss";
import Icon from "../../components/icon";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import StaffDrawer from "../../components/pageComponents/StaffDrawer";

const Staff = () => {
	const user: IUser = useSelector<RootState>((state) => state.auth.user) as IUser;
	const staff: IUser[] = useSelector<RootState>((state) => state.staffState.staff) as IUser[];
	const dispatch = useAppDispatch();
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const staffId = searchParams.get("staffId");

	useEffect(() => {
		const id = user.parentId ? user.parentId : user._id;
		dispatch(fetchStaff(id!));
	}, [dispatch, user]);

	const handleNewStaff = useCallback(() => {
		navigate({
			pathname: "",
			search: createSearchParams({
				staffId: "new",
			}).toString(),
		});
	}, [navigate]);

	if (!staff) {
		return <Loading />;
	}

	return (
		<>
			<div className={styles.staff}>
				<h1>Staff</h1>
				<Tooltip direction="left" content="Add a new lake" className={styles.staff__add}>
					<Button variant="success" onClick={handleNewStaff}>
						<Icon type="plus" size="x-large" />
					</Button>
				</Tooltip>
			</div>
			<StaffDividers staff={staff} />

			{staffId && (
				<>
					<div className="overlay" />
					<StaffDrawer />
				</>
			)}
		</>
	);
};

export default React.memo(Staff);
