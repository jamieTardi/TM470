import React, { useEffect, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { fetchLakes } from "../../../../../../Redux/slices/lakeSlice";
import { RootState, useAppDispatch } from "../../../../../../Redux/store";
import { TBooking } from "../../../../../../Types/booking";
import { Loading, Select } from "../../../../../";
import styles from "./lakeDetails.module.scss";
import NoSelectionCard from "../../../../general/NoSelectionCard";
import LakeMiniCard from "../../../../general/LakeMiniCard";

type TProps = {
	booking: TBooking;
	setBooking: React.Dispatch<React.SetStateAction<any>>;
};

const LakeDetails = ({ booking, setBooking }: TProps) => {
	const dispatch = useAppDispatch();
	const user: IUser = useSelector<RootState>((state) => state.auth.user) as IUser;
	const lakesSelector = useSelector<RootState>((state) => state.lakes) as any;
	const lakes: TLake[] = lakesSelector.lakes;
	const selectedLake = lakes && lakes.filter((lake) => lake._id === booking.lakeId)[0];
	const [currentLake, setCurrentLake] = useState<null | TLake>(selectedLake);

	const handleAddLake = useCallback(
		(id: string) => {
			setBooking({ ...booking, lakeId: id });
			setCurrentLake(lakes.filter((lake) => lake._id === id)[0]);
		},
		[booking, setBooking, lakes]
	);

	const handleRemoveCard = () => {
		setBooking({ ...booking, lakeId: "" });
		setCurrentLake(null);
	};

	useEffect(() => {
		if (!user._id) {
			return;
		}
		dispatch(fetchLakes(user._id));
	}, [user._id, dispatch]);

	useEffect(() => {
		if (!booking.lakeId) {
			return;
		}
		setCurrentLake(selectedLake);
	}, [booking.lakeId, selectedLake]);

	if (!lakes) {
		return <Loading />;
	}

	return (
		<div className={styles.lakeDetails}>
			<h3 className={styles.lakeDetails__title}>2. Add the Lake</h3>
			<Select label="Pick a lake" handleChange={handleAddLake}>
				{lakes.map((lake) => (
					<option key={lake._id} value={lake._id}>
						{lake.name}
					</option>
				))}
			</Select>
			{currentLake ? (
				<LakeMiniCard lake={currentLake} handleRemove={handleRemoveCard} />
			) : (
				<NoSelectionCard item="lake" />
			)}
		</div>
	);
};

export default React.memo(LakeDetails);
