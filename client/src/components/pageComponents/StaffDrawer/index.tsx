import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { createStaff } from "../../../Api/staff";
import { fetchStaff } from "../../../Redux/slices/staffSlice";
import { RootState, useAppDispatch } from "../../../Redux/store";
import { defaultStaff } from "../../../state/staff";
import Button from "../../forms/Button";
import Drawer from "../../general/Drawer";
import DrawerFooter from "../../general/Drawer/DrawerFooter";
import DrawerHeader from "../../general/Drawer/DrawerHeader";
import Content from "./Content";

type Props = {};

const StaffDrawer = (props: Props) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [staffMember, setStaffMember] = useState(defaultStaff);
	const [isLoading, setIsLoading] = useState(false);
	const user: IUser = useSelector<RootState>((state) => state.auth.user) as IUser;
	const parentId = user.parentId ? user.parentId : user._id;
	const dispatch = useAppDispatch();

	const handleClose = useCallback(() => {
		searchParams.delete("staffId");
		setSearchParams(searchParams);
	}, [searchParams, setSearchParams]);

	const handleClearLoading = useCallback(() => {
		setTimeout(() => {
			dispatch(fetchStaff(user.parentId ? user.parentId! : user._id!));
			setIsLoading(false);
			handleClose();
		}, 1500);
	}, [handleClose, user, dispatch]);

	const handleSubmit = useCallback(
		(e: React.FormEvent) => {
			setIsLoading(true);
			e.preventDefault();
			createStaff({ ...staffMember, parentId: parentId });
			handleClearLoading();
		},
		[parentId, staffMember, handleClearLoading]
	);

	return (
		<Drawer>
			<form onSubmit={handleSubmit}>
				<DrawerHeader handleClose={handleClose}>Create a new staff member</DrawerHeader>
				<Content setStaffMember={setStaffMember} staffMember={staffMember} />
				<DrawerFooter>
					<Button variant="destructive" onClick={handleClose}>
						Close
					</Button>

					<Button type="submit" isLoading={isLoading} disabled={isLoading}>
						Create
					</Button>
				</DrawerFooter>
			</form>
		</Drawer>
	);
};

export default React.memo(StaffDrawer);
