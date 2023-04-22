import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Drawer, DrawerHeader, Modal } from "../..";

import { createLake, deleteLake, updateLake } from "../../../Api/lakes";
import { fetchLakes } from "../../../Redux/slices/lakeSlice";
import { RootState, useAppDispatch } from "../../../Redux/store";
import { defaultLakeState } from "../../../state/lake";
import Content from "./Content";
import styles from "./lakeDrawer.module.scss";
import cx from "classnames";
import Footer from "./Footer";

const LakeDrawer = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [showModal, setShowModal] = useState(false);
	const [loading, setIsLoading] = useState(false);
	const user: IUser = useSelector<RootState>((state) => state.auth.user) as IUser;
	const lakeSelector = useSelector<RootState>((state) => state.lakes) as any;
	const dispatch = useAppDispatch();
	const lakeId = searchParams.get("lakeId");
	const existingLake: TLake | undefined =
		lakeSelector.lakes && lakeSelector.lakes.filter((lake: TLake) => lake._id === lakeId)[0];
	const [isDisabled, setIsDisabled] = useState(true);
	const [lake, setLake] = useState<TLake>(existingLake ? existingLake : defaultLakeState);

	const handleClearParams = useCallback(() => {
		searchParams.delete("lakeId");
		setSearchParams(searchParams);
	}, [searchParams, setSearchParams]);

	const handleClearLoading = useCallback(() => {
		setTimeout(() => {
			setIsLoading(false);
			handleClearParams();
			dispatch(fetchLakes(user._id!));
		}, 1500);
	}, [dispatch, handleClearParams, user._id]);

	const handleSendForm = useCallback(
		(e: FormEvent<HTMLFormElement>) => {
			setIsLoading(true);
			e.preventDefault();
			if (!existingLake) {
				createLake({ ...lake, ownerId: user._id! }, handleClearLoading);
				return;
			}
			updateLake(lake, handleClearLoading);
		},
		[lake, user._id, handleClearLoading, existingLake]
	);

	const handleDelete = useCallback(() => {
		setIsLoading(true);
		deleteLake(lake._id, handleClearLoading);
	}, [handleClearLoading, lake._id]);

	useEffect(() => {
		if (!existingLake) {
			return;
		}
		setIsDisabled(false);
	}, [existingLake]);

	return (
		<form onSubmit={(e) => handleSendForm(e)} className={cx({ "no-clicks": showModal })}>
			<Drawer className={styles.drawer}>
				<DrawerHeader handleClose={handleClearParams}>
					{existingLake ? <h2> Edit {existingLake.name}</h2> : <h2>Create a new lake</h2>}
				</DrawerHeader>
				<Content
					className={styles["drawer__content--form"]}
					lake={lake}
					setLake={setLake}
					setIsDisabled={setIsDisabled}
					currentLake={existingLake}
				/>
				<Footer
					handleClearParams={handleClearParams}
					loading={loading}
					setShowModal={setShowModal}
					existingLake={!!existingLake}
					isDisabled={isDisabled}
				/>
			</Drawer>
			{showModal && (
				<Modal
					title={`Delete ${lake.name}`}
					handleClose={() => setShowModal(false)}
					buttonTxt="Delete"
					loading={loading}
					handleChange={handleDelete}
				>
					Are you Sure you want to delete this lake? This will <span className="bold">PERMANENTLY</span> delete this
					lake.
				</Modal>
			)}
		</form>
	);
};

export default React.memo(LakeDrawer);
